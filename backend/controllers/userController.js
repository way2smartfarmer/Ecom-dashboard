const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require('../models/userModels');
const sendToken = require('../utils/jwtToken');
const sendEmail = require("../utils/sendEmail.js");
const crypto = require('crypto');

//Register a User
exports.registerUser = catchAsyncErrors(async (req,res,next)=>{
    const {name,email,password} = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id : "this is a sample id",
            url: "profilepicUrl"
        },
    });

    sendToken(user,201,res);
})


//LOGIN  a User
exports.loginUser = catchAsyncErrors(async (req,res,next) =>{
    const {email,password} = req.body;

    // checking if user has given password and email both

    if(!email || password){
        return next(new ErrorHandler("Please Enter Email & Password",400));
    }

    const user = User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler("Invald Email or Password",401));
    }

    const isPasswordMatched = user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password",401))
    }
    
    sendToken(user,200,res);
    
}
);


//LOGOUT User
exports.logout = catchAsyncErrors(async (req,res,next)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly: true,
    });
    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
});

//Forgot Password
exports.forgotPassword = catchAsyncErrors(async(req,res,next) =>{
    const user= await User.findOne({
        email: req.body.email
    });
    if(!user) {
        return next(new ErrorHandler("User not found",404))
    }

    //Get Resetpassword Token
    const resetToken = user.getResetPasswordToken();
    await user.save({validateBeforeSave: false});

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not regestered this email then, please ignore it`;

    try {
        await sendEmail ({
            email: user.email,
            subject: `Ecommerce Password Recovery`,
            message,
        })
        res.status(200).json({
            success: true,
            message: `email sent to ${user.email} Succesfully`,
        });

    } catch(error) {
       user.resetPasswordToken =undefined;
       user.resetPasswordExpire = undefined;
        
       await user.save({validateBeforeSave: false});

       return next(new ErrorHandler(error.message, 500))
    }
});

//Reset Password
exports.resetPassword = catchAsyncErrors(async(req,res)=>{

    //Creating token hash
    const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now()},
    });

    if(!user) {
        return next(new ErrorHandler('Reset password Token i Invalid or has been Expired',400));
    }

    if(req.body.password !== req.body.confirmPassword)  {
        return next(new ErrorHandler("Password does not match the above Password",400));
    }

    user.password = req.body.password;
    user.resetPasswordToken =undefined;
    user.resetPasswordExpire =undefined;

    await user.save();

    sendToken(user,200, res)
})
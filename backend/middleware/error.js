const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req,res,next) =>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server error";

    //Wrong Mongodb Id error
    if(err.name === 'castError'){
        const message = `Resource ot found. Invalid: ${err.path}`;
        err= new ErrorHandler(message, 400);
    }


    //Mongoose duplicate key error
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err =  new ErrorHandler(message,400)
    }

    //Wrong JWT error
    if(err.name === 'JsonWebTokenError'){
        const message = `Jon Web Token is Invalid, Try again`;
        err= new ErrorHandler(message, 400);
    }
    
      //JWT Expire error
    if(err.name === 'Token Expire Error'){
        const message = `Jon Web Token is Expired, Try again`;
        err= new ErrorHandler(message, 400);
    }

  
    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    })
}
require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const error = require("./middleware/error");
const errorMiddleware = require("./middleware/error");
const cookieParser = require('cookie-parser')
const cloudinary = require('cloudinary');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload')

//Handling Uncaught Exception 
process.on("uncaughtException",(err)=>{
  console.log(`Error : ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1)

})

//Database connection
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to Database"));

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload());

//Route Imports
const product = require("./routes/productRoute");
const user = require('./routes/userRoute')
const order =require('./routes/orderRoute');
const payment =require('./routes/paymentRoute');

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

//Middleware for errors
app.use(errorMiddleware)




const server= app.listen(process.env.PORT, () => console.log(`Server is working on http://localhost:${process.env.PORT}`));

//unhandled Promise Rejection
process.on('unhandledRejection',(err)=>{
  console.log(`Error,${err.message}`);
  console.log(`Shutting down the server due to rejection`);
  server.close(()=>{
    process.exit(1);
  })
}
)
module.exports = app;

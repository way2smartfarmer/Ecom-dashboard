require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const error = require("./middleware/error");
const errorMiddleware = require("./middleware/error");
const cookieParser = require('cookie-parser')


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

app.use(express.json());
app.use(cookieParser());

//Route Imports
const product = require("./routes/productRoutes");
const user = require('./routes/userRoute')

app.use("/api/v1", product);
app.use("/api/v1", user);


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

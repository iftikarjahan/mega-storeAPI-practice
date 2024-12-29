const express=require("express");
require('express-async-errors');
const app=express();
const connectDb=require("./db/connect");
require("dotenv").config();
const authRouter=require("./routes/authRoutes");
const userRoutes=require("./routes/userRoutes");
const notFoundMiddleware=require("./middleware/not-found");
const errorHandlingMiddleware=require("./middleware/error-handler");
const morgan=require("morgan");
const cookieParser = require("cookie-parser");
const {CustomAPIError,UnauthenticatedError}=require("./errors");

app.use(cookieParser(process.env.JWT_SECRET_KEY));    //for parsing the cookies from the request
app.use(express.json())

app.use("/error-test", (req, res, next) => {
    console.log(req.signedCookies);
    
    res.send("Testing Testing")
    // throw new UnauthenticatedError("Test error🚩🚩🚩🚩"); // Synchronous error
});



app.get("/",(req,res,next)=>{
    res.send("Mega Store API practice project");
})

app.use("/api/v1/auth",authRouter);
app.use("/api/v1/users",userRoutes);


app.use(notFoundMiddleware);
app.use(errorHandlingMiddleware);

const PORT=process.env.PORT || 3300;

const start=async ()=>{
    try {
        await connectDb(process.env.MONGO_URI);
        console.log("Connected to db👻");
        app.listen(PORT,()=>{
            console.log(`Server listening on port ${PORT}`);
        }) 
    } catch (err) {
        console.log("Error🚩🚩: ",err);
    }
    
}

start();

const express=require("express");
require('express-async-errors');
const app=express();
const path=require("path");
app.use(express.static(path.join(__dirname,"public")));
const fileUpload=require("express-fileupload");
app.use(fileUpload());
const connectDb=require("./db/connect");
require("dotenv").config();

// routes
const authRouter=require("./routes/authRoutes");
const userRoutes=require("./routes/userRoutes");
const productRoutes=require("./routes/productRoutes");
const reviewRoutes=require("./routes/reviewRoutes");

const notFoundMiddleware=require("./middleware/not-found");
const errorHandlingMiddleware=require("./middleware/error-handler");
const morgan=require("morgan");
const cookieParser = require("cookie-parser");
const {CustomAPIError,UnauthenticatedError}=require("./errors");


app.use(cookieParser(process.env.JWT_SECRET_KEY));    //for parsing the cookies from the request
app.use(express.json())





app.get("/",(req,res,next)=>{
    res.send("Mega Store API practice project");
})

app.use("/api/v1/auth",authRouter);
app.use("/api/v1/users",userRoutes);
app.use("/api/v1/products",productRoutes);
app.use("/api/v1/reviews",reviewRoutes);

app.use("/error-test", (req, res, next) => {
    // console.log(req);
    
    res.send("Testing Testing")
    // throw new UnauthenticatedError("Test error🚩🚩🚩🚩"); // Synchronous error
});

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

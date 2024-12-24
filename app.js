const app=require("express")();
const connectDb=require("./db/connect");
require("dotenv").config();
const authRouter=require("./routes/authRoutes");
const notFoundMiddleware=require("./middleware/not-found");
const errorHandlingMiddleware=require("./middleware/error-handler");


app.get("/",(req,res,next)=>{
    res.send("Mega Store API practice project");
})

app.use("/api/v1/auth",authRouter);


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

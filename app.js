const app=require("express")();
const connectDb=require("./db/connect");
require("dotenv").config();
const authRouter=require("./routes/authRoutes");


app.get("/",(req,res,next)=>{
    res.send("Mega Store API practice project");
})

app.use("/api/v1/auth",authRouter);



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

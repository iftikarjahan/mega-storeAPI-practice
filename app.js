const app=require("express")();
const connectDb=require("./db/connect");
require("dotenv").config();


app.use((req,res,next)=>{
    res.send("Hello World");
})


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

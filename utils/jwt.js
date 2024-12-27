const jwt=require("jsonwebtoken");
require("dotenv").config();

/*
->the below function syntax means that the function will receive an object as an argument
which contains a property named payload
*/ 
const createJWT=({payload})=>{
    return jwt.sign(payload,process.env.JWT_SECRET_KEY,{expiresIn:process.env.JWT_LIFETIME});
}

module.exports={
    createJWT
}
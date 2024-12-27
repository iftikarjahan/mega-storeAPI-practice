const jwt=require("jsonwebtoken");
require("dotenv").config();

/*
->the below function syntax means that the function will receive an object as an argument
which contains a property named payload
*/ 
const createJWT=({payload})=>{
    return jwt.sign(payload,process.env.JWT_SECRET_KEY,{expiresIn:process.env.JWT_LIFETIME});
}

// here I need to create a function that would attach the token to the cookie
const attachJWTtoCookie=({res,tokenPayload})=>{
    const token = createJWT({ payload: tokenPayload });
      /*
      ->now set the token in http cookie
      ->This is because, we generally should not send the token in the response as they could be accessed by attackers
      ->Instead of sending the jwt token inside the response.json(), we send it as a cookie(in the res.cookie()
      ->Now If I send a request from the client, I will get the token inside of the cookie and not in the response
      ->With every subsequent requests, you will get the cookie and hence would be able to access the token
      */ 
      res.cookie("myToken", token, {
        httpOnly: true,
        maxAge: 360000, //1hr
      });
}

module.exports={
    createJWT,
    attachJWTtoCookie
}
const {UnauthenticatedError}=require("../errors");
const {verifyJWT}=require("../utils");


/*
->The primary task of the authentication middlware is to check whether the user is
logged in with the valid credentials or not and then pass the info so that it could be 
used
*/ 
const authMiddleware=(req,res,next)=>{
    const token=req.signedCookies.myToken;
    if(!token){
        throw new UnauthenticatedError("Authentication failed...Please login and try again");
    }
    // from the above token, we need to extract the info and pass it to the req.user so that it could be used in further requests
    try {
        const decodedPayload=verifyJWT({token});
        req.user={...decodedPayload};
        console.log("ccc");
        
        next();
    } catch (error) {
        throw new UnauthenticatedError("Authentication failed....please login and try again");
    }
    
}

module.exports=authMiddleware;


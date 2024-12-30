const {UnauthorizedError}=require("../errors");

const authorizationMiddleware=(req,res,next)=>{
    if(req.user.role!=="admin"){
        throw new UnauthorizedError("Unauthorized to access this route");
    }
    next();
}

module.exports=authorizationMiddleware;

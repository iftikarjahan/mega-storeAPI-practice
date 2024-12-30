const {UnauthorizedError}=require("../errors");

const authorizationMiddleware=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            throw new UnauthorizedError("Unauthorized to access this route");
        }
        next();
    }
}

module.exports=authorizationMiddleware;

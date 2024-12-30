const generateTokenPayload=(userObject)=>{
    // It takes an object and then generates the token payload object
    return {name:userObject.name,role:userObject.role,id:userObject._id}
}

module.exports=generateTokenPayload;
const{createJWT,attachJWTtoCookie,verifyJWT}=require("./jwt");
const generateTokenPayload=require("./tokenPayload");

module.exports={
    createJWT,
    attachJWTtoCookie,
    verifyJWT,
    generateTokenPayload
}
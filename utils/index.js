const{createJWT,attachJWTtoCookie,verifyJWT}=require("./jwt");
const generateTokenPayload=require("./tokenPayload");
const checkPermission=require("./checkPermission");

module.exports={
    createJWT,
    attachJWTtoCookie,
    verifyJWT,
    generateTokenPayload,
    checkPermission
}
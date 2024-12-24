const router=require("express").Router();
const authControllers=require("../controllers/authController");

router.post("/register",authControllers.register);
router.post('/login',authControllers.login);
router.get("/logout",authControllers.logout);

module.exports=router;
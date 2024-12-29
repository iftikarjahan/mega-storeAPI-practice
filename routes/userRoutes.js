const express=require("express");
const router=express.Router();
const userControllers=require("../controllers/userController");
const authMiddleware=require("../middleware/authMiddleware");


router.route("/").get(authMiddleware,userControllers.getAllUsers);
router.route("/showCurrentUser").get(userControllers.getCurrentUser);
router.route("/updateUser").patch(userControllers.updateUser);
router.route("/updateUserPassword").patch(userControllers.updateUserPassword);

// note that this route should be at the bottom
router.route("/:id").get(authMiddleware,userControllers.getSingleUser);

module.exports=router;




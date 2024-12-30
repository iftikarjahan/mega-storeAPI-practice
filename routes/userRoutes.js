const express=require("express");
const router=express.Router();
const userControllers=require("../controllers/userController");
const authMiddleware=require("../middleware/authMiddleware");
const authorizationMiddleware=require("../middleware/authorizationMiddleware");

/*
FLOW
->First the user logs in and then gets the after login screen
->In that afterLoginScreen, if he clicks on the getAllUsers Button, then 2 steps will happen
    1. The user would be authenticated first using the authMiddleware
    2.Then the user would be authorized for specific permissions using the authorization middleware
*/ 

router.route("/").get(authMiddleware,authorizationMiddleware("admin"),userControllers.getAllUsers);
router.route("/showCurrentUser").get(authMiddleware,userControllers.getCurrentUser);
router.route("/updateUser").patch(authMiddleware,userControllers.updateUser);
router.route("/updateUserPassword").patch(authMiddleware,userControllers.updateUserPassword);

// note that this route should be at the bottom
router.route("/:id").get(authMiddleware,userControllers.getSingleUser);

module.exports=router;




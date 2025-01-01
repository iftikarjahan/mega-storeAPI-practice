const express = require("express");
const router = express.Router();
const authMiddleware=require("../middleware/authMiddleware");
const authorizationMiddleware=require("../middleware/authorizationMiddleware");

const {
  getAllProducts,     
  getSingleProduct,
  createProduct,       //only for admin
  updateProduct,       //only for admin
  deleteProduct,       //only for admin
  uploadImage,         //only for admin
} = require("../controllers/productController");

router.route("/").get(getAllProducts).post([authMiddleware,authorizationMiddleware("admin")],createProduct);
router.route("/uploadImage").post([authMiddleware,authorizationMiddleware("admin")],uploadImage);
router.route("/:id").get(getSingleProduct).patch([authMiddleware,authorizationMiddleware("admin")],updateProduct).delete([authMiddleware,authorizationMiddleware("admin")],deleteProduct);


module.exports=router;

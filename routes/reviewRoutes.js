const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  createReview,
  getAllReviews,
  deleteReview,
  getSingleReview,
  updateReview,
} = require("../controllers/reviewControllers");


router.route("/").post(authMiddleware,createReview).get(getAllReviews);
router.route("/:id").get(authMiddleware,getSingleReview).patch(authMiddleware,updateReview).delete(authMiddleware,deleteReview);


module.exports=router;

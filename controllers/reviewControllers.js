const Review = require("../models/Review");
const Product = require("../models/Product");
const { NotFoundError, BadRequestError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const createReview = async (req, res, next) => {
  const { product: productId } = req.body;
  // I need to check if the product really exists or not
  const productExist =await Product.findById(productId);
  if (!productExist) {
    throw new NotFoundError(`No product exist with the id:${productId}`);
  }
  // now find for which user the review is created.....the user has already been set by the auth middlware
  const reviewUser = req.user.id;
  // Now you need to check if the review has already been submitted or not
  const reviewAlreadySubmitted = await Review.findOne({
    user: reviewUser,
    product: productId,
  });
  if (reviewAlreadySubmitted) {
    throw new BadRequestError("Already submitted review for this product");
  }
  const review = await Review.create({ ...req.body, user: reviewUser });

  res.status(StatusCodes.OK).json({ review });
};

const getAllReviews = (req, res, next) => {
  res.send("Get all reviews");
};

const getSingleReview = (req, res, next) => {
  res.send("Get Single Review");
};

const updateReview = (req, res, next) => {
  res.send("Update Review");
};

const deleteReview = (req, res, next) => {
  res.send("Delete Review");
};

module.exports = {
  createReview,
  getAllReviews,
  deleteReview,
  getSingleReview,
  updateReview,
};

const Review = require("../models/Review");
const Product = require("../models/Product");
const { NotFoundError, BadRequestError } = require("../errors");
const { StatusCodes } = require("http-status-codes");
const {checkPermission}=require("../utils");

const createReview = async (req, res, next) => {
  const { product: productId } = req.body;
  // I need to check if the product really exists or not
  const productExist = await Product.findById(productId);
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

const getAllReviews = async (req, res, next) => {
  const reviews = await Review.find({});
  res.status(StatusCodes.OK).json({ reviews, length: reviews.length });
};

const getSingleReview =async (req, res, next) => {
    const {id:reviewId}=req.params;
    const review=await Review.findById(reviewId);
    if(!review){
        throw new NotFoundError(`No review exists with the id: ${reviewId}`);
    }
    res.status(StatusCodes.OK).json({review});
};

const updateReview =async (req, res, next) => {
  const {id:reviewId}=req.params;
  const review=await Review.findById(reviewId);
  if(!review){
    throw new NotFoundError(`No review exist with the id: ${reviewId}`);
  }
  // If the review exist, you need to check for the permissions
  checkPermission(req.user,review.user);
  // now make the changes by extarcting the data from the req.body
  const {rating,title,comment}=req.body;
  review.rating=rating;
  review.title=title;
  review.comment=comment;
  await review.save();

  res.status(StatusCodes.OK).json({msg:"Review Updated",review});
};

const deleteReview =async (req, res, next) => {
  const {id:reviewId}=req.params;
  const review=await Review.findById(reviewId);
  if(!review){
    throw new BadRequestError(`No review exists with the id: ${reviewId}`);
  }
  // If there is a review, you need to check if you have the permission to delete the review
  checkPermission(req.user,review.user);
  await review.deleteOne();
  res.status(StatusCodes.OK).json({msg:"Review Deleted Successfully"});
};

module.exports = {
  createReview,
  getAllReviews,
  deleteReview,
  getSingleReview,
  updateReview,
};

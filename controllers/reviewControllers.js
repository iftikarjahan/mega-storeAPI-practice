const createReview=(req,res,next)=>{
    res.send("Create Review");
}

const getAllReviews=(req,res,next)=>{
    res.send("Get all reviews");
}

const getSingleReview=(req,res,next)=>{
    res.send("Get Single Review");
}

const updateReview=(req,res,next)=>{
    res.send("Update Review");
}

const deleteReview=(req,res,next)=>{
    res.send("Delete Review");
}

module.exports={
    createReview,
    getAllReviews,
    deleteReview,
    getSingleReview,
    updateReview
}
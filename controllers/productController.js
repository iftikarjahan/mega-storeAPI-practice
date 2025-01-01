const getAllProducts=(req,res,next)=>{
    res.send("Get all products");
}

const getSingleProduct=(req,res,next)=>{
    res.send("Get Single Product");
}

const createProduct=(req,res,next)=>{
    res.send("Create Product");
}

const updateProduct=(req,res,next)=>{
    res.send("Update Product");
}

const deleteProduct=(req,res,next)=>{
    res.send("Delete Product");
}

const uploadImage=(req,res,next)=>{
    res.send("Upload Image");
}

module.exports={
    getAllProducts,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    uploadImage
}
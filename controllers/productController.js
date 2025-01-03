const Product=require("../models/Product");
const StatusCodes=require("http-status-codes")
const {NotFoundError}=require("../errors");

const getAllProducts=async (req,res,next)=>{
    const allProducts=await Product.find({});
    res.status(StatusCodes.OK).json({allProducts,count:allProducts.length});
}

const getSingleProduct=async (req,res,next)=>{
    const {id:productId}=req.params;
    const product=await Product.findById(productId);
    // console.log(product);
    
    if(!product){
        throw new NotFoundError(`No product found with this id: ${productId}`);
    }
    
    res.status(StatusCodes.OK).json({product});
}

const createProduct=async (req,res,next)=>{
    req.body.user=req.user.id;
    const createdProduct=await Product.create({...req.body});
    res.status(StatusCodes.CREATED).json({createdProduct});
}

const updateProduct=async (req,res,next)=>{
    const {id:productId}=req.params;
    const updatedProduct=await Product.findOneAndUpdate({_id:productId},req.body,{
        new:true,
        runValidators:true
    });

    if(!updateProduct){
        throw new NotFoundError(`No product found with this id: ${productId}`);
    }

    res.status(StatusCodes.OK).json({updatedProduct});
}

const deleteProduct=async (req,res,next)=>{
    const {id:productId}=req.params;
    const toBeDeletedProduct=await Product.findById(productId);
    // console.log(toBeDeletedProduct);
    
    if(!toBeDeletedProduct){
        throw new NotFoundError(`No product found with this id: ${productId}`);
    }
    await toBeDeletedProduct.deleteOne();  //to perform other schema validations
    res.status(StatusCodes.OK).json({msg:"Product deleted successfully"});
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
const Product=require("../models/Product");
const StatusCodes=require("http-status-codes")
const {NotFoundError,BadRequestError}=require("../errors");
const path=require("path");

const getAllProducts=async (req,res,next)=>{
    const allProducts=await Product.find({});
    res.status(StatusCodes.OK).json({allProducts,count:allProducts.length});
}

const getSingleProduct=async (req,res,next)=>{
    const {id:productId}=req.params;
    const product=await Product.findById(productId).populate("reviews");
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

const uploadImage=async (req,res,next)=>{
    //console.log(req.files);   //the image is available in req.files because of the express-fileUpload package
    if(!req.files){
        throw new BadRequestError("No file Uploaded!");
    }
    const productImage=req.files.myImage;
    if(!productImage.mimetype.startsWith("image")){
        throw new BadRequestError("No image Uploaded....Please upload the image");
    }
    // check size of image
    if(productImage.size>(1024*1024)){
        throw new BadRequestError("Please upload an image smaller than 1MB");
    }
    // once every checks are done, move the file to the public folder
    const imagePath=path.join(__dirname,"..","public","uploads",productImage.name);
    await productImage.mv(imagePath);

    // note that we are sending the relative path of the image as response
    // because when the request will come we will already be searching inside the public folder
    res.status(StatusCodes.OK).json({imageUrl:`/uploads/${productImage.name}`});
}

module.exports={
    getAllProducts,
    getSingleProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    uploadImage
}
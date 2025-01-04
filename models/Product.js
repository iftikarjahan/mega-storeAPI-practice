const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide the product name"],
    maxlength: [100, "Name cannot be more than 100 characters"],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, "Please provide product price"],
    default: 0,
  },
  description: {
    type: String,
    required: [true, "Product description is required"],
    maxlength: [1000, "Description cannot be more than 1000 characters"],
  },
  image: {
    type: String,
    default: "/uploads/example.png",
  },
  category:{
    type:String,
    required:[true,"Please provide product category"],
    enum:["office","kitchen","bedroom"]
  },
  company:{
    type:String,
    required:[true,"Please provide the company name"],
    enum:{
        values:["ikea","tata","godrej"],
        message:"{VALUE} is not supported"
    }
  },
  colors:{
    type:[String],  //an array of strings
    default:["#222"],
    required:true
  },
  featured:{
    type:Boolean,
    default:false
  },
  freeShipping:{
    type:Boolean,
    default:false
  },
  inventory:{
    type:Number,
    required:true,
    default:15
  },
  averageRating:{
    type:Number,
    default:0
  },
  numOfReviews:{
    type:Number,
    default:0
  },
  user:{
    type:mongoose.Types.ObjectId,
    ref:"User",
    required:true
  }
},{timestamps:true});

module.exports=mongoose.model("Product",ProductSchema);

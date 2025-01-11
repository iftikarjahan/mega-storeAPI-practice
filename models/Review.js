const mongoose=require("mongoose");

const ReviewSchema=mongoose.Schema({
    rating:{
        type:Number,
        min:1,
        max:5,
        required:[true,"Please provide rating"]
    },
    title:{
        type:String,
        trim:true,
        required:[true,"Please provide title for the rating"],
        maxLength:100
    },
    comment:{
        type:String,
        required:[true,"Please provide the text for the comment"]
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    product:{
        type:mongoose.Schema.ObjectId,
        ref:"Product",
        required:true
    }
},{timestamps:true});


/*
->Mongodb uses indexing when doing validation behind the scenes
->By default, an index is always created based on the _id field of a document
->So when I use validation logics(like setting unique:true in the schema),and someone
enters a duplicate value, it uses indexing behind the scenes
->So now If I have to do a validation that is based on two fields of a document, I have
to use compound indexing
->Note that compound indexes does not create any new field. Instead it orgnizes the 
collection in such a way that querying becomes faster and the document follows certain rules
->The code below ensures that one user can give review for a product only once
*/ 
ReviewSchema.index({product:1,user:1},{unique:true});  //for validation

/*
->Static methods are used for model leve; methods that are not related to specific document
instances
->Called directly on the model
*/ 
ReviewSchema.statics.calculateAverageRating=async function(productId){
    console.log(productId);
}

ReviewSchema.post("save",async function(){
    await this.constructor.calculateAverageRating(this.product);
    console.log("Inisde post save hook");
})

ReviewSchema.post("deleteOne",{ document: true, query: false },async function(){
    console.log("Post delete hook called");
})

ReviewSchema.statics.calculateAverageRating=async function(productId){
    console.log(productId);
}

module.exports=mongoose.model("Review",ReviewSchema);
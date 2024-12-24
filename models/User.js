/*
->The first idea that came to my mind is creating the schema because my app would consist
of users
*/ 

const mongoose=require("mongoose");
const validator=require("validator");

const UserSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please provide the name field"],
        minlength:3,
        maxlength:50
    },
    email:{
        type:String,
        required:[true,"Please provide the email field"],
        validate:{
            validator:validator.isEmail,
            message:props=>`${props.email} is not a valid email.`
        }
    },
    password:{
        type:String,
        required:[true,"Please provide the password field"],
        minlength:6
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    }
})

module.exports=mongoose.model("User",UserSchema);
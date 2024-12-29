/*
->The first idea that came to my mind is creating the schema because my app would consist
of users
*/ 

const mongoose=require("mongoose");
const validator=require("validator");
const bcrypt=require("bcrypt");

const UserSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please provide the name field"],
        minlength:3,
        maxlength:50
    },
    email:{
        unique:true,
        type:String,
        required:[true,"Please provide the email field"],
        validate:{
            validator:validator.isEmail,
            message:props=>`${props.value} is not a valid email.`
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

UserSchema.pre("save",async function(next){
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(this.password,salt);
    this.password=hashedPassword;
    next();
})

UserSchema.methods.comparePassword=async function(enteredPassword){
    const passwordIsCorrect=await bcrypt.compare(enteredPassword,this.password);
    return passwordIsCorrect;
}

module.exports=mongoose.model("User",UserSchema);
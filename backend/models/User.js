import mongoose from "mongoose";
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        
    },
    role:{
        type:String,
        enum:["user","admin","volunteer"],
        default:"user",
    },
    phone: {
        type: String,
        default: "",
        },
    address: {
        type: String,
        default: "",
        },
    profilePhoto: {
        type: String,
        default: "",
        },
        },
     {
    timestamps: true,
    }
);
const User=mongoose.model("User",userSchema);
export default User;
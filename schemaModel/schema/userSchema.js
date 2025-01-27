import { Schema } from "mongoose";
import { genderEnum } from "../../constant/constant.js";

let userSchema = Schema({
    firstName:{
        type:String,
        trim:true
    },

    middleName:{
        type:String,
        trim:true
    },

    lastName:{
        type:String,
        trim:true
    },

    password:{
        type:String,
        trim:true
    },

    gender:{
        type:String,
        trim:true,
        enum:{
            values:genderEnum,
            message:(enumValue)=>{
                return `${enumValue.value} is not valid enum`
            }
        }
    },

    email:{
        type:String,
        lowercase:true,
        trim:true,
        unique:[true, "Email already exist..."],
    },

    phoneNumber:{
        type:String
    },

    roles: [{
        type: String,
        trim: true,
        default: "user"
    }],

    isVerified: {
        type: Boolean,
        default: false,
    },

    profile: {
        type: String,
        trim: true,
    },

    userId: {
        type: Number,
        trim: true,
        unique: true
    },
    password:{
        type:String,
        trim:true,
        minlength:6

    },
    activationCode:{
        type:String
    }
}, { timestamps: true })

export default userSchema
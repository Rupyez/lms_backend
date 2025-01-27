import mongoose, {Schema} from 'mongoose';


const commentSchema = Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // This will reference the User model
        required: true,
    },

comment:{
    type:String,
},
commentReplies:[{
    type:String
}]
},{timestamps:true})

export default commentSchema
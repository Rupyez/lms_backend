import mongoose, { Schema } from "mongoose";

const reviewSchema = Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // This will reference the User model
        required: true,
    },
    rating: {
        type: Number,
        default: 0,
    },
    comment: {
        type:String
    },
    commentReplies: [{
        type:String
    }], // Assuming replies are nested comments
});

export default reviewSchema;
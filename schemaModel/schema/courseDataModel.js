
import mongoose, {Schema} from "mongoose";


const courseDataSchema = Schema({
    videoUrl: String,
    title: String,
    videoSection: String,
    description: String,
    videoLength: Number,
    videoPlayer: String,
    links:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Link"
    }],
    suggestion:String,
    questions:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment", // Reference the Comment model 
    }]
})

export default courseDataSchema
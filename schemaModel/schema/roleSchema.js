import { Schema } from "mongoose";

let roleSchema = Schema({
    name: {
        type:String,
        trim:true
    }
},{timestamps:true})

export default roleSchema
import mongoose from "mongoose";
import { dbUrl } from "../config/config.js";


export const connectDb = async () =>{
    mongoose.set("strictQuery", false)

    try{
        await mongoose.connect(dbUrl)
        console.log(`Mongodb is connected at ${dbUrl} successfully`)
    }catch(error){
        console.log(error.message)
    }
}
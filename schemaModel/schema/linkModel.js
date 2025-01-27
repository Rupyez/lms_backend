import {Schema} from "mongoose";

const linkSchema = Schema({
    title: {
        type:String
    },
    url: {
        type:String
    },
});

export default linkSchema

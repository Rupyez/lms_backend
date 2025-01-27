import { model } from "mongoose";
import categorySchema from "./schema/categoryModel.js";
import commentSchema from "./schema/commentModel.js";
import courseDataSchema from "./schema/courseDataModel.js";
import courseSchema from "./schema/courseModel.js";
import linkSchema from "./schema/linkModel.js";
import reviewSchema from "./schema/reviewModel.js";
import userSchema from "./schema/userSchema.js";
import { tokenSchema } from "./schema/tokenSchema.js";
import roleSchema from "./schema/roleSchema.js";


export const Category = model("Category", categorySchema)
export const Comment = model("Comment", commentSchema)
export const courseData = model("courseData", courseDataSchema)
export const Course = model("Course", courseSchema)
export const Link = model("Link", linkSchema)
export const Review = model("Review", reviewSchema)

export const User = model("User", userSchema)
export const TokenData = model("TokenData", tokenSchema)
export const Role = model("Role", roleSchema)

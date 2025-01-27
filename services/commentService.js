import { Comment } from "../schemaModel/model.js";

export const createCommentService = async({body}) => Comment.create(body);
export const getAllCommentService = async({
    find = {},
    sort = "",
    limit = "",
    skip = "",
    select = "",
})=> Category.find(find).sort(sort).limit(limit).skip(skip).select(select);

export const getSpecificCommentService = async({id}) => Comment.findById(id);
export const deleteSpecificCommentService = async ({ id }) => Comment.findByIdAndDelete(id);

export const updateSpecificCommentService = async ({ id, body }) =>
    Comment.findByIdAndUpdate(id, body, { new: true, runValidators: true })

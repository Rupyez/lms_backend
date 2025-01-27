import { courseData } from "../schemaModel/model.js";


export const createcourseDataService = async({body}) => courseData.create(body);
export const getAllcourseDataService = async({
    find = {},
    sort = "",
    limit = "",
    skip = "",
    select = "",
})=> courseData.find(find).sort(sort).limit(limit).skip(skip).select(select);

export const getSpecificcourseDataService = async({id}) => courseData.findById(id);
export const deleteSpecificCommentService = async ({ id }) => Comment.findByIdAndDelete(id);

export const updateSpecificcourseDataService = async ({ id, body }) =>
    courseData.findByIdAndUpdate(id, body, { new: true, runValidators: true })
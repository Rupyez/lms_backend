import { Course } from "../schemaModel/model.js";


export const createCourseService = async({body}) => Course.create(body);
export const getAllCourseService = async({
    find = {},
    sort = "",
    limit = "",
    skip = "",
    select = "",
})=> Course.find(find).sort(sort).limit(limit).skip(skip).select(select);

export const getSpecificCourseService = async({id}) => Course.findById(id);
export const deleteSpecificCourseService = async ({ id }) => Course.findByIdAndDelete(id);

export const updateSpecificCourseService = async ({ id, body }) =>
    Course.findByIdAndUpdate(id, body, { new: true, runValidators: true })
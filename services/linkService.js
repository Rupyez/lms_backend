import { Link } from "../schemaModel/model.js";


export const createLinkService = async({body}) => Link.create(body);
export const getAllLinkService = async({
    find = {},
    sort = "",
    limit = "",
    skip = "",
    select = "",
})=> Link.find(find).sort(sort).limit(limit).skip(skip).select(select);

export const getSpecificLinkService = async({id}) => Link.findById(id);
export const deleteSpecificCommentService = async ({ id }) => Link.findByIdAndDelete(id);

export const updateSpecificLinkService = async ({ id, body }) =>
    Link.findByIdAndUpdate(id, body, { new: true, runValidators: true })
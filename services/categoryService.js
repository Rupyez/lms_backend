import { Category } from "../schemaModel/model.js";

export const createCategoryService = async ({ body }) => Category.create(body)
export const getAllCategoryService = async ({
    find = {},
    sort = "",
    limit = "",
    skip = "",
    select = "",
}) => Category.find(find).sort(sort).limit(limit).skip(skip).select(select);


export const getSpecificCategroyService = async ({ id }) => Category.findById(id);

export const deleteSpecificCategoryService = async ({ id }) => Category.findByIdAndDelete(id);

export const updateSpecificCategoryService = async ({ id, body }) =>
    Category.findByIdAndUpdate(id, body, { new: true, runValidators: true })

import { Role } from "../schemaModel/model.js";

export const createRoleService = async({body}) => Role.create(body);

export const getAllRoleService = async({
    find = {},
    sort = "",
    limit = "",
    skip = "",
    select = "",
}) => Role.find(find).sort(sort).limit(limit).skip(skip).select(select);

export const getSpecificRoleService = async({id}) => Role.findById(id)

export const updateSpecificRoleService = async({id, body}) => Role.findByIdAndUpdate(id, body, {new:true, runValidators:true})

export const deleteSpecificRoleService = async({id}) => Role.findByIdAndDelete(id)
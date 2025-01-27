import { User } from "../schemaModel/model.js";

export const createUserService = async ({ body }) => User.create(body)
export const getAllUserService = async ({
    find = {},
    sort = "",
    limit = "",
    skip = "",
    select = "",
}) => User.find(find).sort(sort).limit(limit).skip(skip).select(select);


export const getSpecificUserService = async ({ id }) => User.findById(id);

export const getMyProfile = async({id}) => User.findById(id);

export const getSpecificUserByAny = async({email}) =>User.findOne({email})

export const deleteSpecificUserService = async ({ id }) => User.findByIdAndDelete(id);

export const updateSpecificUSerService = async ({ id, body }) =>
    User.findByIdAndUpdate(id, body, { new: true, runValidators: true })

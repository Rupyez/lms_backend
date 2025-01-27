import { TokenData } from "../schemaModel/model.js";

export const createTokenService = async ({ data }) => TokenData.create(data)

export const deleteSpecificTokenService = async ({ id }) => TokenData.findByIdAndDelete(id)

export const deleteAllTokenUser = async ({ userId }) => TokenData.deleteMany({ userId })
import { Review } from "../schemaModel/model.js";


export const createReviewService = async({body}) => Review.create(body);
export const getAllReviewService = async({
    find = {},
    sort = "",
    limit = "",
    skip = "",
    select = "",
})=> CReview.find(find).sort(sort).limit(limit).skip(skip).select(select);

export const getSpecificReviewService = async({id}) => Review.findById(id);
export const deleteSpecificReviewService = async ({ id }) => Review.findByIdAndDelete(id);

export const updateSpecificReviewService = async ({ id, body }) =>
    Review.findByIdAndUpdate(id, body, { new: true, runValidators: true })
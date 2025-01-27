import successResponseData from "../helper/successResponseData.js";
import catchAsyncErrors from "../middleware/catchAsyncError.js";
import { Category } from "../schemaModel/model.js";
import { categoryService } from "../services/index.js";

export const createCategory = catchAsyncErrors(async (req, res, next) => {
  let body = { ...req.body };

  let data = await categoryService.createCategoryService({ body });
  successResponseData({
    res,
    message: "Category created successfully",
    data,
  });
});

export const getAllCategory = catchAsyncErrors(async (req, res, next) => {
  let find = {};
  req.find = find;
  req.service = categoryService.getAllCategoryService;
});

export const getSpecificCategory = catchAsyncErrors(async (req, res, next) => {
  let id = req.params.id;
  let data = await categoryService.getSpecificCategroyService({ id });

  if (data) {
    successResponseData({
      res,
      message: "Specific category fetched successfully",
      statusCode: HttpStatus.OK,
      data,
    });
  } else {
    successResponseData({
      res,
      message: "Category Id not found.",
      statusCode: HttpStatus.NOT_FOUND,
    });
  }
});

export const updateSpecificCategory = catchAsyncErrors(
  async (req, res, next) => {
    let body = { ...req.body };
    let id = req.params.id;

    let data = await categoryService.updateSpecificCategoryService({
      id,
      body,
    });
    successResponseData({
      res,
      message: "Category updated successfully",
      statusCode: HttpStatus.CREATED,
      data,
    });
  }
);

export const deleteSpecificCategory = catchAsyncErrors(
  async (req, res, next) => {
    let id = req.params.id;
    let data = await categoryService.deleteSpecificCategoryService({ id });

    successResponseData({
      res,
      message: "About Deleted successfully",
      statusCode: HttpStatus.OK,
      data,
    });
  }
);

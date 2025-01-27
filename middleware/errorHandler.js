import { HttpStatus } from "../constant/constant.js";

let ErrorHandler = (error, req, res, next) => {
    // Default values for statusCode and message
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = "Internal server error";

    // Ensure the error is not undefined or null, and that it's an Error object
    if (error && typeof error === "object" && error.message) {
        // Log the error to check its properties
        console.log("Error:", error);

        // Specific error handling
        if (error.code === 11000) {
            statusCode = HttpStatus.CONFLICT;
            message = "Duplicate key error";
        } else if (error.name === "CastError" && error.kind === 'ObjectId') {
            statusCode = HttpStatus.BAD_REQUEST;
            message = "Invalid Object Id";
        } else {
            message = error.message || message;
            statusCode = error.statusCode || statusCode;
        }
    } else {
        // If error is not an object or doesn't have a message, log and use generic message
        console.error("Error is not a valid object:", error);
        message = "Unexpected error occurred";
    }

    // Send the response
    res.status(statusCode).json({
        success: false,
        message
    });
};

export default ErrorHandler;

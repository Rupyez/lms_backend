import { secretKey } from "../config/config.js";
import { HttpStatus } from "../constant/constant.js";
import { TokenData } from "../schemaModel/model.js";
import { userService } from "../services/index.js";
import jwt from 'jsonwebtoken';
import catchAsyncErrors from "./catchAsyncError.js";

const extractToken = (authorization) => {
    if (!authorization) {
        throw new Error('No authorization header provided');
    }

    const [bearer, token] = authorization.split(' ');

    if (bearer !== 'Bearer' || !token) {
        throw new Error('Invalid authorization format. Use: Bearer <token>');
    }

    return token;
};

export const isValidToken = catchAsyncErrors(async (req, res, next) => {
    try {
        // Extract token from header
        const token = extractToken(req.headers.authorization || '');

        const decodedToken = await jwt.verify(token, secretKey);

        if (!decodedToken || !decodedToken.userId) {
            return res.status(HttpStatus.UNAUTHORIZED).json({
                success: false,
                message: 'Invalid or expired token'
            });
        }

        const tokenExists = await TokenData.findOne({ token });
        if (!tokenExists) {
            return res.status(HttpStatus.UNAUTHORIZED).json({
                success: false,
                message: 'Token has been revoked or is invalid'
            });
        }

        // Get user details
        const user = await userService.getSpecificAuthUser({
            id: decodedToken.userId,
        });

        if (!user) {
            return res.status(HttpStatus.UNAUTHORIZED).json({
                success: false,
                message: 'User not found or unauthorized'
            });
        }

        // Attach user and token info to request
        req.user = user;
        req.token = token;
        req.tokenData = tokenExists;

        next();
    } catch (error) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
            success: false,
            message: error.message || 'Authentication failed'
        });
    }
});

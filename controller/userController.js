import { expiryIn, secretKey, tokenTypes } from "../config/config.js";
import { HttpStatus } from "../constant/constant.js";
import successResponseData from "../helper/successResponseData.js";
import catchAsyncErrors from "../middleware/catchAsyncError.js";
import { userService, tokenService } from "../services/index.js";
import getTokenExpiryTime from "../utils/getTokenExpiryTime.js";
import {  comparePassword, hashPassword } from "../utils/hashFunction.js";
import { throwError } from "../utils/throwError.js";
import { sendEmailToVerify } from "../services/emailService.js";
import { User } from "../schemaModel/model.js";
import { createActivationToken, generateToken, verifyToken } from "../utils/token.js";
import bcrypt from 'bcryptjs';

export const createUser = catchAsyncErrors(async (req, res, next) => {
  const body = { ...req.body };
  const { email } = body;

  const existingUser = await userService.getSpecificUserByAny({ email });
  console.log('Existing user:', existingUser === null);

  if (existingUser !== null) {
    throwError({
      message: "Email already exists...",
      statusCode: HttpStatus.UNAUTHORIZED,
    });
  }

  const hashedPassword = await hashPassword(body.password);
  const userCount = await User.find({}).countDocuments();
  
  body.userId = (userCount || 0) + 1;
  body.password = hashedPassword;
  body.roles = (!body.roles || body.roles.some(role => role.trim() === "")) 
    ? ["student"] 
    : body.roles;

  const userData = await userService.createUserService({ body });

  const { token, activationCode } = createActivationToken(userData);


  const hashActivationCode = await hashPassword(activationCode, 10);
  userData.activationCode = hashActivationCode;
  await userData.save();

  const tokenData = {
    token,
    userId: userData._id,
    type: tokenTypes.VERIFY_EMAIL,
    expiration: getTokenExpiryTime(token).toLocaleString(),
  };
  await tokenService.createTokenService({ data: tokenData });

  await sendEmailToVerify({
    email,
    token,
    firstName: body.firstName,
    lastName: body.firstName,
    activationCode,
  });

  successResponseData({
    res,
    message: "Verification mail has been sent.",
    statusCode: HttpStatus.CREATED,
    data: userData,
  });
});

export const activateUser = catchAsyncErrors(async (req, res) => {

  const token = req?.query?.token || req?.body?.token; 
  const activationCode = req?.body?.activationCode;


  if (!token || !activationCode) {

    if (Number(activationCode) !== Number(activationCode)) {
      throw new Error("Invalid activation code");
    }

    return res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: "Token and activation code are required.",
    });
  }


  const veryfyTOken = await verifyToken(token, secretKey);

  if (!veryfyTOken) {
    return res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: "Invalid token or activation code.",
    });
  }


  const findUser = await userService.getUserById({userId: veryfyTOken.user.userId})
  if(!findUser){
    return res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: "User not found.",
    });
  }

  const isActivationCodeValid = await bcrypt.compare(activationCode, findUser.activationCode)

  if(!isActivationCodeValid){
    return res.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: "Invalid activation code.",
    });
  }


  const data = await userService.updateSpecificUSerService({
    id: veryfyTOken.user.id,
    body: { isVerified: true },
  });

  return res.status(HttpStatus.OK).json({
    success: true,
    message: "User activated successfully.",
    data,
  });

});


//login user
export const loginUser = catchAsyncErrors(async (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = await userService.getSpecificUserByAny({ email });
  
  if (!user) {
    throwError({
      message: "Invalid email or password",
      statusCode: HttpStatus.UNAUTHORIZED,
    });
  }

  // Verify password
  const isValidPassword = await comparePassword(password, user.password);
  
  if (!isValidPassword) {
    throwError({
      message: "Invalid email or password",
      statusCode: HttpStatus.UNAUTHORIZED,
    });
  }

  // Generate access token
  const tokenPayload = { 
    userId: user.userId, 
    role: user.role 
  };
  
  const { token } = await generateToken(tokenPayload, secretKey, expiryIn);
  const expiryTime = getTokenExpiryTime(token);

  // Save token in database
  const tokenData = {
    token,
    userId: user.userId,
    type: tokenTypes.ACCESS,
    expiration: expiryTime.toLocaleString(),
  };

  await tokenService.createTokenService({ data: tokenData });

  // Return success response
  successResponseData({
    res,
    message: "Login successful",
    statusCode: HttpStatus.OK,
    data: {
      token,
      user: {
        userId: user.userId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        roles: user.roles
      }
    },
  });
});

// logout User
export const logoutUser = catchAsyncErrors(async (req, res, next) => {
  await tokenService.deleteSpecificTokenService({ id: req.token.tokenId })

  successResponseData({
    res,
    message: "Logout successfully.",
    statusCode: HttpStatus.OK
  })
})
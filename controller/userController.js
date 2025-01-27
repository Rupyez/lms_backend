import { expiryIn, secretKey, tokenTypes } from "../config/config.js";
import { HttpStatus } from "../constant/constant.js";
import successResponseData from "../helper/successResponseData.js";
import catchAsyncErrors from "../middleware/catchAsyncError.js";


import { userService, tokenService } from "../services/index.js";
import getTokenExpiryTime from "../utils/getTokenExpiryTime.js";
import { hashPassword } from "../utils/hashFunction.js";
import { throwError } from "../utils/throwError.js";
import { sendEmailToVerify } from "../services/emailService.js";
import { User } from "../schemaModel/model.js";
import { createActivationToken, generateToken } from "../utils/token.js";

export const createUser = catchAsyncErrors(async (req, res, next) => {
  let body = { ...req.body };
  body.isVerified = false;

  //check if user already exist or not
  let email = body.email;
  let user = await userService.getSpecificUserByAny({ email });
  let getAllUser = await User.find({}).countDocuments(); // Correct method
  body.userId = (getAllUser || 0) + 1;

  if (!body.roles || body.roles.some((role) => role.trim() === "")) {
    body.roles = ["student"]; // Set default role as "student"
  }

  if (user) {
    throwError({
      message: "Email already Exist.",
      statusCode: HttpStatus.UNAUTHORIZED,
    });
  } else {
    let data = await userService.createUserService({ body });
    delete data._doc.password;
    let infoObj = { userId: data._id };

    const { token, activationCode } = createActivationToken(data);
    data.activationCode = activationCode;
    await data.save();

    let emailToken = await generateToken(infoObj, secretKey, expiryIn);
    console.log(token);

    let tokenData = {
      token: token,
      userId: data._id,
      type: tokenTypes.VERIFY_EMAIL,
      expiration: getTokenExpiryTime(token).toLocaleString(),
    };

 

    await tokenService.createTokenService({ data: tokenData });
    await sendEmailToVerify({
      email,
      token,
      firstName: body.firstName,
      lastName: body.firstName,
      activationCode: activationCode,
    });

    successResponseData({
      res,
      message: "Verification mail has been sent.",
      statusCode: HttpStatus.CREATED,
      data,
    });
  }
});

export const activateUser = catchAsyncErrors(async (req, res, next) => {
    const userId = req.info ? req.info.userId : null;
    const tokenId = req.token ? req.token.tokenId : null;
    const { token, activationCode, password } = req.body;

    

    console.log("Request Info:", req.info);

    if (!userId) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          message: "User ID not found.",
        });
      }
  
    let passHashedPassowrd = await hashPassword(password);

    if (!token || !activationCode) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          success: false,
          message: "Token and activation code are required.",
        });
      }

  //ensure both token and activation code are provided

    const decoded = await verifyToken(token, secretKey, activationCode);

        // Ensure `decoded.user.id` exists
        if (!decoded || !decoded.user || !decoded.user.id) {
            throw new Error("Invalid token payload. Missing user ID.");
          }

    // const user = await userService.updateSpecificUSerService(
    //   decoded.email,
    //   { isVerified: true }
    // );


    const data = await userService.updateSpecificUSerService({
        id: decoded.user.id, id, // Pass the user ID
        body: { isVerified: true , password:passHashedPassowrd}, // Fields to update
      }); 

      delete data._doc.password;

      if (tokenId) {
        await tokenService.deleteSpecificTokenService({ id: tokenId });
      }

    return res.status(HttpStatus.OK).json({
      success: true,
      message: "User activated successfully.",
      data,    
    });
 
});


//login user
export let loginUser = catchAsyncErrors(async(req, res, next)=>{
    let email = req.body.email;
    let password = req.body.password;
    let user = await userService.getSpecificUserByAny({ email });
    if (user === null) {
        throwError({
            message: "Please enter valid email or password.",
            statusCode: 401,
        });
    } else {
        let isValidPassword = await comparePassword(password, user.password);
        if (isValidPassword) {
            let infoObj = { userId: user._id, role: user.role };
            let token = await generateToken(infoObj, secretKey, expiryIn);

            let data = {
                token: token,
                userId: user._id,
                type: tokenTypes.ACCESS,
                expiration: getTokenExpiryTime(token).toLocaleString(),
            };
            console.log(data)
            await tokenService.createTokenService({ data });

            successResponseData({
                res,
                message: "Login Successfully.",
                statusCode: HttpStatus.OK,
                data: {
                    token: token,
                    user: user,
                },
            });
        } else {
            throwError({
                message: "Please enter valid email or password.",
                statusCode: 401,
            });
        }
    }
    
})


// logout User
export const logoutUser = catchAsyncErrors(async(req, res, next)=>{
    await tokenService.deleteSpecificTokenService({id:req.token.tokenId})

    successResponseData({
        res,
        message: "Logout successfully.",
        statusCode: HttpStatus.OK
    })
})
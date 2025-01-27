import jwt from "jsonwebtoken";
import {HttpStatus} from '../constant/constant.js'



export const generateToken = async(
  infoObj ={},
  secretKey = "",
  expiresIn = "365d",
  includeActivationCode = false
) =>{

    let expiresInfo = {
    expiresIn: expiresIn,
  };

  try{
  if(includeActivationCode){
    infoObj.activationCode = Math.floor(1000 + Math.random() * 9000).toString();
  }

  const token = await jwt.sign(infoObj, secretKey, expiresInfo)

  //return the token and activation code if included
  return includeActivationCode
  ? {token, activationCode:infoObj.activationCode} :{token};

}catch(error){
  const err = new Error(error.message);
  err.statusCode = 400;
  throw err;
}
}


// 2nd verify token
export const verifyToken = async (token="", secretKey="", activationCode="") => {
    try{

       // Ensure the activation code is provided
    if (!activationCode) {
      throw new Error("Activation code is required.");
    }
        const infoObj = await jwt.verify(token, secretKey)

        if (Number(infoObj.activationCode) !== Number(activationCode)) {
          throw new Error("Invalid activation code");
        }
        return infoObj    

    }catch(error){
        let err = new Error(error.message);
        error.statusCode = HttpStatus.UNAUTHORIZED
        throw err;
    }
};


// function to create an activation token with a code
export const createActivationToken = (user) => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString(); // Generate a 4-digit activation code
  const token = jwt.sign(
    {
      user,
      activationCode,
    },
    process.env.SECRET_KEY || "default_secret_key", // Use a default secret key if not defined
    {
      expiresIn: "30m", // Token expires in 5 minutes
    }
  );
  return { token, activationCode };
};


//generate token
// export const generateToken = async (
//   infoObj = {},
//   secretKey = "",
//   expiresIn = "365d"
// ) => {

//   //send expiresInfo like
//   let expiresInfo = {
//       expiresIn: expiresIn,
//   }

//   //generate token
//   //at infoObj we mostly use _id property and roles
//   try {
//       let token = await jwt.sign(infoObj, secretKey, expiresInfo);
//       return token

//   } catch (error) {
//       let err = new Error(error.message);
//       error.statusCode = "400";
//       throw err;
//   }
// }

//verify token
// export const verifyToken = async (token = "", secretKey = "") => {
//   try {
//       let infoObj = await jwt.verify(token, secretKey)
//       return infoObj;
//   } catch (error) {
//       let err = new Error(error.message);
//       error.statusCode = HttpStatus.UNAUTHORIZED
//       throw err;
//   }
// }
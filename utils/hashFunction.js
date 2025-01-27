import bcrypt from 'bcryptjs';

// 1st hash the password
export const hashPassword = async(password="", salt=10) =>{
    try{
        let innerHashPassword = await bcrypt.hash(password, salt)
        return innerHashPassword

    }catch(error){
        let err = new Error(error.message)
        err.statusCode = 400;
        throw err;
    }
}

//2nd compare password
export const comparePassword = async(password = "", hashPassword = "") =>{
    try{
        let isValidPassword = await bcrypt.compare(password, hashPassword)
        return isValidPassword
    }catch(error){
        let err = new Error("Please Enter valid Email or Password")
        err.statusCode = 401;
        throw err;
    }
}
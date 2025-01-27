import nodemailer from "nodemailer";
import { emailHost,  fromEmail, fromPassword, smtpPort } from "../config/config.js";

let transporterInfo ={
    host: emailHost,
    port: smtpPort,
    secure: false,
    auth: {
        user: fromEmail,
        pass: fromPassword
    } 
}

export const sendMail = async(mailInfo) =>{
    try{
        let transporter = nodemailer.createTransport(transporterInfo);
        let info = await transporter.sendMail(mailInfo)
        return info
    }catch(error){
        console.log(error.message)
    }
}
import { config } from "dotenv";


config()

export const port = Number(process.env.PORT) || 8080;
// export const dbUrl = process.env.DB_URL || "mongodb+srv://sabin123:sabin123@cluster0.6xnhi3r.mongodb.net/newa_chulo_database?retryWrites=true&w=majority"
export const dbUrl = process.env.DB_URL

export const staticFolder = "./public";

export const apiVersion = process.env.API_VERSION
export const secretKey = process.env.SECRET_KEY;
export const expiryIn = process.env.EXPIRY_IN;

export const clientBaseUrl = process.env.ENVIRONMENT === "development" ? process.env.BASE_URL_DEVELOPMENT : process.env.ENVIRONMENT === "staging" ? process.env.BASE_URL_STAGING : process.env.ENVIRONMENT === "production" ? process.env.BASE_URL_PRODUCTION :  process.env.BASE_URL_DEVELOPMENT


export const fromEmail = process.env.SMTP_MAIL
export const fromPassword = process.env.SMTP_PASSWORD
export const emailHost = process.env.SMTP_HOST;
export const reset_expiry_in = process.env.RESET_EXPIRE_IN;
export const verifEmailExpiryIn = process.env.VERIFY_EMAIL_EXPIRY_IN || "1d"
export const emailName = process.env.EMAIL_NAME;
export const smtpPort = process.env.SMTP_PORT;
const environment = process.env.ENVIRONMENT || "test";

export const tokenTypes = {
    ACCESS: "access",
    RESET_PASSWORD: "resetPassword",
    VERIFY_EMAIL: "verifEmail"
};

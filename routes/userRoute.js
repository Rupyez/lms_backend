import {Router} from 'express';
import { userController } from '../controller/index.js';
import { isValidToken } from '../middleware/isValidToken.js';


const userRouter = Router()


userRouter
    .route("/registration")
    .post(userController.createUser)

    userRouter
    .route("/activate-user")
    .post(isValidToken, userController.activateUser)

export default userRouter
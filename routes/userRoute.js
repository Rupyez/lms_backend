import {Router} from 'express';
import { userController } from '../controller/index.js';


const userRouter = Router()


userRouter
    .route("/registration")
    .post(userController.createUser)

    userRouter
    .route("/activate-user")
    .post( userController.activateUser)

    userRouter
    .route("/login")
    .post( userController.loginUser)

export default userRouter
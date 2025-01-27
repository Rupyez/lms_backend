import {Router} from 'express';
import { categoryController } from '../controller/index.js';

const categoryRouter = Router()


categoryRouter
    .route("/create")
    .post(categoryController.createCategory)

export default categoryRouter
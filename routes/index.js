import {Router} from 'express';
import categoryRouter from './categoryRoute.js';
import userRouter from './userRoute.js';


const apiRouter = Router();

const ourRoutes= [
    {
        path:`/category`,
        router:categoryRouter
    },
    
        {
            path:`/user`,
            router:userRouter
        }
    
]

ourRoutes.forEach((route)=>{
    apiRouter.use(route.path, route.router)
})
export default apiRouter

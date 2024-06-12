import { Router } from 'express';
import authRouter from './auth/auth-router';
import { getAllUsers } from './auth/user-controller';
// other routers can be imported here

const globalRouter = Router();


globalRouter.use(authRouter);
globalRouter.get('/users', getAllUsers);

// other routers can be added here

export default globalRouter;

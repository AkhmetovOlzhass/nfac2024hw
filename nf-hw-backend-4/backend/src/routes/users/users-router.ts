import { Router } from 'express';
import UsersController from './users-controller';
import multer from 'multer';
import UserService from './users-service';

const userRouter = Router();
const userService = new UserService();
const usersController = new UsersController(userService);
const upload = multer({ storage: multer.memoryStorage() });

userRouter.get('/users', (req, res) => usersController.getUsers(req, res));

userRouter.get('/:id', (req, res) => usersController.getUserById(req, res));
userRouter.put('/:id',upload.single('avatar'), (req, res) => usersController.updateUser(req, res));



export default userRouter;
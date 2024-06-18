import { Router } from 'express'
import authRouter from './auth/auth-router'
import songRouter from './songs/songs-router'
import userRouter from './users/users-router'

const globalRouter = Router()

globalRouter.use('/auth', authRouter)
globalRouter.use('/songs', songRouter);
globalRouter.use('/users', userRouter);

export default globalRouter

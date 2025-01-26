import { Router } from 'express';
import { userRouter } from './users.router';

export const router = Router();

router.use('/users', userRouter);


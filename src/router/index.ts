import { Router } from 'express';
import { userRouter } from './users.router';
import { todoRouter } from './todos.router';

export const router = Router();

router.use('/users', userRouter);
router.use('/todos', todoRouter);


import { Router } from 'express';
import { todoRouter } from './todo.router';

export const router = Router();

router.use('/todo', todoRouter);


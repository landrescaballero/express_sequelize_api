import { TodoModel } from '../indexModels';
import { Request, Response } from 'express';
import { ICreateTodo, IUpdateTodo } from '../interfaces';
import db from '../db';

const getTodos = async (req: Request, res: Response) => {
    try {
        const { user_id } = req.params;
        const todos = await TodoModel.findAll({
            where: {
                user_id,
            },
        });

        res.status(200).json({
            status: true,
            todos,
        });
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            message: "Internal server error"
        });
        return;
    }
};

const createTodo = async (req: Request, res: Response) => {
    const transaction = await db.transaction();
    try {
        const { title, description, user_id }: ICreateTodo = req.body;

        const newTodo = await TodoModel.create({
            title,
            description,
            user_id,
        });

        if (!newTodo) {
            await transaction.rollback();
            res.status(400).json({
                status: false,
                message: "Todo not created"
            });
            return;
        }

        await transaction.commit();
        res.status(201).json({
            status: true,
            todo: newTodo,
        });
        return;
    } catch (error) {
        console.log(error);
        await transaction.rollback();
        res.status(500).json({
            status: false,
            message: "Internal server error"
        });
        return;
    }
};

const updateTodo = async (req: Request, res: Response) => {
    const transaction = await db.transaction();
    try {
        const { id } = req.params;
        const { title, description }: IUpdateTodo = req.body;

        const todo = await TodoModel.findByPk(id);

        if (!todo) {
            await transaction.rollback();
            res.status(404).json({
                status: false,
                message: "Todo not found"
            });
            return;
        }

        if (title) todo.title = title;
        if (description) todo.description = description;
        await todo.save({ transaction });
        await transaction.commit();
        res.status(200).json({
            status: true,
            todo,
        });
        return;
    } catch (error) {
        res.status(500).json({
            status: false,
            message: "Internal server error"
        });
        return;
    }
}

const deleteTodo = async (req: Request, res: Response) => {
    const transaction = await db.transaction();
    try {
        const { id } = req.params;

        const todo = await TodoModel.findByPk(id);

        if (!todo) {
            await transaction.rollback();
            res.status(404).json({
                status: false,
                message: "Todo not found"
            });
            return;
        }

        await todo.destroy({ transaction });
        await transaction.commit();
        res.status(200).json({
            status: true,
            message: "Todo deleted"
        });
        return;
    } catch (error) {
        console.log(error);
        await transaction.rollback();
        res.status(500).json({
            status: false,
            message: "Internal server error"
        });
        return;
    }
}

const endTodo = async (req: Request, res: Response) => {
    const transaction = await db.transaction();
    try {
        const { id } = req.params;

        const todo = await TodoModel.findByPk(id);

        if (!todo) {
            await transaction.rollback();
            res.status(404).json({
                status: false,
                message: "Todo not found"
            });
            return;
        }

        todo.status = 1;
        await todo.save({ transaction });

        await transaction.commit();
        res.status(200).json({
            status: true,
            todo,
        });
        return;
    } catch (error) {
        console.log(error);
        await transaction.rollback();
        res.status(500).json({
            status: false,
            message: "Internal server error"
        });
        return;
    }
}

const reopenTodo = async (req: Request, res: Response) => {
    const transaction = await db.transaction();
    try {
        const { id } = req.params;

        const todo = await TodoModel.findByPk(id);

        if (!todo) {
            await transaction.rollback();
            res.status(404).json({
                status: false,
                message: "Todo not found"
            });
            return;
        }

        todo.status = 0;
        await todo.save({ transaction });

        await transaction.commit();
        res.status(200).json({
            status: true,
            todo,
        });
        return;
    } catch (error) {
        console.log(error);
        await transaction.rollback();
        res.status(500).json({
            status: false,
            message: "Internal server error"
        });
        return;
    }
}

export default {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    endTodo,
    reopenTodo,
}
import bcrypt from "bcrypt";
import { ICreateUser, IUpdateUser } from "../interfaces";
import { UserModel } from "../indexModels";
import { Request, Response } from "express";
import db from "../db";

const getUsers = async (_req: Request, res: Response) => {
    try {
        const users = await UserModel.findAll();

        res.status(200).json({
            status: true,
            users,
        });
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            message: "Internal server error",
        });
        return;
    }
};

const getUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await UserModel.findByPk(id);

        if (!user) {
            res.status(404).json({ status: false, message: "User not found" });
            return;
        }

        res.status(200).json({
            status: true,
            user,
        });
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            message: "Internal server error",
        });
        return;
    }
};

const createUser = async (req: Request, res: Response) => {
    const transaction = await db.transaction();
    try {
        const { username, password }: ICreateUser = req.body;

        const newPassword = await bcrypt.hash(password, 10);

        const newUser = await UserModel.create({
            username,
            password: newPassword,
        });

        if (!newUser) {
            await transaction.rollback();
            res.status(400).json({ status: false, message: "User not created" });
            return;
        }

        await transaction.commit();
        res.status(201).json({ status: true, user: newUser });
        return;
    } catch (error) {
        console.log(error);
        await transaction.rollback();
        res.status(500).json({ status: false, message: "Internal server error" });
        return;
    }
};

const updateUser = async (req: Request, res: Response) => {
    const transaction = await db.transaction();
    try {
        const { id } = req.params;
        const { username, password }: IUpdateUser = req.body;

        const user = await UserModel.findByPk(id);

        if (!user) {
            res.status(404).json({ status: false, message: "User not found" });
            return;
        }

        if (password) {
            const newPassword = await bcrypt.hash(password, 10);
            user.password = newPassword;
        }

        if (username) user.username = username;

        await user.save({ transaction });

        await transaction.commit();
        res.status(200).json({
            status: true,
            user,
        });
        return;
    } catch (error) {
        console.log(error);
        await transaction.rollback();
        res.status(500).json({
            status: false,
            message: "Internal server error",
        });
        return;
    }
};

const deleteUser = async (req: Request, res: Response) => {
    const transaction = await db.transaction();

    try {
        const { id } = req.params;
        const user = await UserModel.findByPk(id);

        if (!user) {
            res.status(404).json({ status: false, message: "User not found" });
            return;
        }

        await user.destroy({ transaction });

        await transaction.commit();
        res.status(200).json({ status: true, message: "User deleted" });
        return;
    } catch (error) {
        console.log(error);
        await transaction.rollback();
        res.status(500).json({
            status: false,
            message: "Internal server error",
        });
        return;
    }
};

const signIn = async (req: Request, res: Response) => {
    try {
        const { username, password }: ICreateUser = req.body;

        const user = await UserModel.findOne({ where: { username } });

        if (!user) {
            res.status(404).json({ status: false, message: "User not found" });
            return;
        }

        const isPasswordCorrect = bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            res.status(400).json({ status: false, message: "Invalid password" });
            return;
        }

        res.status(200).json({ status: true, message: "User logged in", id: user.id });
        return;
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: false,
            message: "Internal server error",
        });
        return;
    }
}


export default {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    signIn,
};
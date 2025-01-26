import { Request, Response } from "express";

const getUsers = (_req: Request, res: Response) => {
    res.send("All users");
};

const getUser = (_req: Request, res: Response) => {
    res.send("User");
};

const createUser = (_req: Request, res: Response) => {
    res.send("User created");
};

const updateUser = (_req: Request, res: Response) => {
    res.send("User updated");
};

const deleteUser = (_req: Request, res: Response) => {
    res.send("User deleted");
};


export default {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
};
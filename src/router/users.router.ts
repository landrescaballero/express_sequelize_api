import { Router } from "express";
import { UserController } from "../controllers";

const { 
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
 } = UserController;

export const userRouter = Router();

userRouter.get(
    "/all/", 
    getUsers
);

userRouter.get(
    "/one/:id", 
    getUser
);

userRouter.post(
    "/create/", 
    createUser
);

userRouter.put(
    "/update/:id", 
    updateUser
);

userRouter.delete(
    "/delete/:id", 
    deleteUser
);


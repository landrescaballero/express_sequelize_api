import { Router } from "express";
import middlewares from "../middlewares";
import { check } from "express-validator";
import { UserController } from "../controllers";

const { checkFields } = middlewares;

const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    signIn,
} = UserController;

export const userRouter = Router();

userRouter.get(
    "/all/",
    getUsers
);

userRouter.get(
    "/one/:id",
    [
        check("id").notEmpty().withMessage("Id is required")
            .bail().isUUID().withMessage("Id is invalid"),
        checkFields,
    ],
    getUser
);

userRouter.post(
    "/create/",
    [
        check("username").notEmpty().withMessage("Username is required")
            .bail().isString().withMessage("Username must be a string"),
        check("password").notEmpty().withMessage("Password is required")
            .bail().isString().withMessage("Password must be a string"),
        checkFields,
    ],
    createUser
);

userRouter.put(
    "/update/:id",
    [
        check("id").notEmpty().withMessage("Id is required")
            .bail().isUUID().withMessage("Id is invalid"),
        check("username").optional().notEmpty().withMessage("Username is required")
            .bail().isString().withMessage("Username must be a string"),
        check("password").optional().notEmpty().withMessage("Password is required")
            .bail().isString().withMessage("Password must be a string"),
        checkFields,
    ],
    updateUser
);

userRouter.delete(
    "/delete/:id",
    [
        check("id").notEmpty().withMessage("Id is required")
            .bail().isUUID().withMessage("Id is invalid"),
        checkFields,
    ],
    deleteUser
);

userRouter.post(
    "/sign-in/",
    [
        check("username").notEmpty().withMessage("Username is required")
            .bail().isString().withMessage("Username must be a string"),
        check("password").notEmpty().withMessage("Password is required")
            .bail().isString().withMessage("Password must be a string"),
        checkFields,
    ],
    signIn
);
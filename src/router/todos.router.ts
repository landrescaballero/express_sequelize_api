import { Router } from "express";
import middlewares from "../middlewares";
import { check } from "express-validator";
import { TodoController } from "../controllers";

const { checkFields } = middlewares;

const {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    endTodo,
    reopenTodo,
} = TodoController;

export const todoRouter = Router();

todoRouter.get(
    "/all/:user_id",
    [
        check("user_id").notEmpty().withMessage("User id is required")
            .bail().isUUID().withMessage("User id is invalid"),
        checkFields,
    ],
    getTodos
);

todoRouter.post(
    "/create/",
    [
        check("title").notEmpty().withMessage("Title is required")
            .bail().isString().withMessage("Title must be a string"),
        check("description").notEmpty().withMessage("Description is required")
            .bail().isString().withMessage("Description must be a string"),
        check("user_id").notEmpty().withMessage("User id is required")
            .bail().isUUID().withMessage("User id is invalid"),
        checkFields,
    ],
    createTodo
);

todoRouter.put(
    "/update/:id",
    [
        check("id").notEmpty().withMessage("Id is required")
            .bail().isUUID().withMessage("Id is invalid"),
        check("title").optional().notEmpty().withMessage("Title is required")
            .bail().isString().withMessage("Title must be a string"),
        check("description").optional().notEmpty().withMessage("Description is required")
            .bail().isString().withMessage("Description must be a string"),
        checkFields,
    ],
    updateTodo
);

todoRouter.delete(
    "/delete/:id",
    [
        check("id").notEmpty().withMessage("Id is required")
            .bail().isUUID().withMessage("Id is invalid"),
        checkFields,
    ],
    deleteTodo
);

todoRouter.put(
    "/end/:id",
    [
        check("id").notEmpty().withMessage("Id is required")
            .bail().isUUID().withMessage("Id is invalid"),
        checkFields,
    ],
    endTodo
);

todoRouter.put(
    "/reopen/:id",
    [
        check("id").notEmpty().withMessage("Id is required")
            .bail().isUUID().withMessage("Id is invalid"),
        checkFields,
    ],
    reopenTodo
);
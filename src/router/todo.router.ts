import { Router } from "express";

export const todoRouter = Router();

todoRouter.get("/", (_req, res) => {
    res.send("Hello World");
});


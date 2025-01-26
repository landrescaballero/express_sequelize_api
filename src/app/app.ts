import path from 'path';
import morgan from 'morgan';
import express from 'express';
import { router } from "../router";

const app = express();

app.use(morgan("dev"));
app.use("/api/v1", router);
app.get("/", express.static("public/"));

app.use((_req, res) => {
    res
        .sendFile(path.join(__dirname, "../public/page-not-found.html"));
});

export default app;
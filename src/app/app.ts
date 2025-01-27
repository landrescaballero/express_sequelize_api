import path from 'path';
import morgan from 'morgan';
import express from 'express';
import { router } from "../router";
import bodyParser from 'body-parser';

const app = express();


app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use("/api/v1", router);
app.get("/", express.static("public/"));

app.use((_req, res) => {
    res
        .sendFile(path.join(__dirname, "../public/page-not-found.html"));
});

export default app;
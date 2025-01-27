import db from "./db";
import app from "./app/app";
import Config from "./config";

const { port } = Config;


console.log("starting server...");
db;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
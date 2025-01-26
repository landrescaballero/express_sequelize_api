import app from "./app/app";
import { config } from "./config";

const { port } = config;

console.log("starting server...");

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
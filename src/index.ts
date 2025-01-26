import app from "./app/app";
import sequelize from "./db";
import Config from "./config";

const { port } = Config;


console.log("starting server...");
sequelize;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
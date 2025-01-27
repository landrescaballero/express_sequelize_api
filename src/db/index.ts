import { Sequelize } from "sequelize-typescript";
import Config from "../config";

const {
    nameDB,
    userDB,
    passwordDB,
    hostDB,
    portDB,
} = Config;

const db = new Sequelize({
    database: nameDB,
    username: userDB,
    password: passwordDB,
    host: hostDB,
    port: portDB,
    logging: false,
    dialect: "mariadb",
    models: [__dirname + "/../models"],
    dialectOptions: {
        connectTimeout: 30000, 
    },
    pool: {
        max: 20,
        min: 0,
        acquire: 60000,
        idle: 10000
    }
});

async function syncDB() {
    console.log("Syncing database...");
    await db.sync();
    console.log("Database synced");
}

syncDB();

export default db;
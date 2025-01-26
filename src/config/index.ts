import dotenv from 'dotenv';
dotenv.config();

const config = {
    port: parseInt(process.env.PORT || "3000"),
    nameDB: process.env.NAME_DB,
    userDB: process.env.USER_DB,
    passwordDB: process.env.PASSWORD_DB,
    hostDB: process.env.HOST_DB,
    portDB: parseInt(process.env.PORT_DB || "3306"),
};

export default config;
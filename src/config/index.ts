import dotenv from 'dotenv';
dotenv.config();
export const config = {
    port: process.env.PORT || 3000,
    nameDB: process.env.NAME_DB,
    userDB: process.env.USER_DB,
    passwordDB: process.env.PASSWORD_DB,
    hostDB: process.env.HOST_DB,
    portDB: process.env.PORT_DB,
};
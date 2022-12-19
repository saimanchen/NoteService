"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const dirname = path_1.default.resolve();
dotenv_1.default.config({ path: path_1.default.resolve(dirname, '.env') });
if (!process.env.NODE_ENV) {
    throw 'No valid environment set!';
}
const NODE_ENV = process.env.NODE_ENV;
const envPath = path_1.default.resolve(dirname, `.env.${NODE_ENV}`);
dotenv_1.default.config({ path: envPath });
if (!process.env.DB_URL) {
    throw "No DB URL was found!";
}
if (!process.env.JWT_SECRET) {
    throw "No JWT SECRET was found!";
}
if (!process.env.JWT_VALIDITY) {
    throw "No JWT VALIDITY was found!";
}
const PORT = Number(process.env.PORT);
const environment = {
    NODE_ENV,
    MESSAGE: process.env.MESSAGE || "No Message",
    PORT: PORT,
    DB_URL: process.env.DB_URL,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_VALIDITY: process.env.JWT_VALIDITY
};
exports.default = environment;

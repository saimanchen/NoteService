"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const dirname = path_1.default.resolve();
dotenv_1.default.config();
if (!process.env.NODE_ENV) {
    throw 'No valid environment set!';
}
const NODE_ENV = process.env.NODE_ENV;
const envPath = path_1.default.resolve(dirname, `.env.${NODE_ENV}`);
dotenv_1.default.config({ path: envPath });
const environment = {
    NODE_ENV,
    MESSAGE: process.env.MESSAGE || "No Message",
    PORT: Number(process.env.PORT) || 8080,
    DB_URL: process.env.DB_URL
};
exports.default = environment;

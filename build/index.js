"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("./utils/db"));
const environment_1 = __importDefault(require("./utils/environment"));
const fastify_1 = __importDefault(require("fastify"));
const routes_1 = require("./routes");
const auth_1 = __importDefault(require("./utils/auth"));
const server = (0, fastify_1.default)({ logger: true });
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield server
            .register(db_1.default)
            .register(auth_1.default)
            .register(routes_1.Routes)
            .listen({ port: environment_1.default.PORT, host: '0.0.0.0' });
        console.log("The server is running!");
    }
    catch (error) {
        server.log.error(error);
        process.exit(1);
    }
});
start();

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
const jwt_1 = __importDefault(require("@fastify/jwt")); // fastify-plugin
const fastify_plugin_1 = __importDefault(require("fastify-plugin"));
function Auth(server, options) {
    return __awaiter(this, void 0, void 0, function* () {
        yield server.register(jwt_1.default, {
            secret: "Hello123",
            sign: {
                expiresIn: "15m"
            }
        });
        server.decorate("authenticate", (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield req.jwtVerify();
            }
            catch (error) {
                res.code(401).send(error);
            }
        }));
    });
}
exports.default = (0, fastify_plugin_1.default)(Auth);

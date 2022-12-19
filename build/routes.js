"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const controllers = __importStar(require("./controllers"));
const schemas = __importStar(require("./schemas"));
function Routes(server, options) {
    return __awaiter(this, void 0, void 0, function* () {
        // ENDPOINT: /register
        server.route({
            method: "POST",
            url: "/register",
            schema: schemas.RegisterSchema,
            handler: controllers.RegisterController
        });
        // ENDPOINT: /login
        server.route({
            method: "POST",
            url: "/login",
            schema: schemas.LoginSchema,
            handler: controllers.LoginController
        });
        // ENDPOINT: /notes
        server.route({
            method: "GET",
            url: "/notes",
            preHandler: [server.authenticate],
            schema: schemas.GetNotesSchema,
            handler: controllers.GetNotesController
        });
        server.route({
            method: "DELETE",
            url: "/notes",
            schema: schemas.DeleteAllNotesSchema,
            handler: controllers.DeleteAllNotesController
        });
        // ENDPOINT: /note
        server.route({
            method: "POST",
            url: "/notes",
            preHandler: [server.authenticate],
            schema: schemas.AddNoteSchema,
            handler: controllers.AddNoteController
        });
        server.route({
            method: "DELETE",
            url: "/notes/:id",
            schema: schemas.DeleteNoteSchema,
            handler: controllers.DeleteNoteController
        });
        // ENDPOINT: /category
        server.route({
            method: "GET",
            url: "/notes/:category",
            schema: schemas.GetNotesCategorySchema,
            handler: controllers.GetNotesCategoryController
        });
        server.route({
            method: "DELETE",
            url: "/notes/:category/del",
            schema: schemas.DeleteNotesCategorySchema,
            handler: controllers.DeleteNotesCategoryController
        });
        // ENDPOINT: /update
        server.route({
            method: "PUT",
            url: "/update",
            schema: schemas.UpdateNoteSchema,
            handler: controllers.UpdateNoteController
        });
    });
}
exports.Routes = Routes;

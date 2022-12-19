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
exports.UpdateNoteController = exports.DeleteNotesCategoryController = exports.GetNotesCategoryController = exports.DeleteNoteController = exports.AddNoteController = exports.DeleteAllNotesController = exports.GetNotesController = exports.LoginController = exports.RegisterController = void 0;
const validateEmail_js_1 = __importDefault(require("./utils/validateEmail.js"));
function RegisterController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const isEmailValid = (0, validateEmail_js_1.default)(req.body.email);
            if (!isEmailValid) {
                res.status(400).send("Invalid e-mail format");
                return;
            }
            const { User } = req.db.models;
            const existsUser = yield User.findOne({ email: req.body.email });
            if (existsUser) {
                res.status(400).send({ success: false, message: "E-mail address is already in use!" });
            }
            const newUser = yield User.create(req.body);
            res.status(201).send({ success: true, message: `Registered new user with userID: ${newUser.id}` });
        }
        catch (error) {
            req.log.error(error);
            yield res.status(500).send("Error occurred when registering a new user");
        }
    });
}
exports.RegisterController = RegisterController;
function LoginController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { User } = req.db.models;
            const user = yield User.findOne({
                email: req.body.email,
                password: req.body.password
            }).exec();
            if (!user) {
                res.status(404).send("No user exists with this e-mail address");
            }
            if (user != null) {
                const jwtToken = yield res.jwtSign({
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    userId: user.id
                }, { expiresIn: "15m" });
                const responseData = { token: jwtToken };
                res.status(201).send({ success: true, message: responseData });
            }
        }
        catch (error) {
            req.log.error(error);
            yield res.status(500).send("Error occurred when logging in!");
        }
    });
}
exports.LoginController = LoginController;
function GetNotesController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { Note } = req.db.models;
            const notes = yield Note.find({ userId: req.user.userId }).exec();
            return notes;
        }
        catch (error) {
            req.log.error(error);
            yield res.status(500).send("Error occurred when fetching notes!");
        }
    });
}
exports.GetNotesController = GetNotesController;
function DeleteAllNotesController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { Note } = req.db.models;
            const { deletedCount } = yield Note.deleteMany({});
            if (deletedCount === 0) {
                res.code(404);
                return { success: false, message: "There are no notes to delete!" };
            }
            res.code(201);
            return { success: true, message: "All notes were deleted!" };
        }
        catch (error) {
            req.log.error(error);
            yield res.status(500).send("Error occurred when deleting all notes!");
        }
    });
}
exports.DeleteAllNotesController = DeleteAllNotesController;
function AddNoteController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            req.log.info("Request received!");
            const { Note, User } = req.db.models;
            const foundUser = yield User.findOne({ _id: req.body.userId });
            if (!foundUser) {
                return yield res.status(404).send("User not found!");
            }
            const newNote = yield Note.create(req.body);
            // appends noteId to the user's noteIds-array
            foundUser.noteIds.push(newNote.id);
            yield foundUser.save();
            res.status(201);
            return { success: true, message: `uploaded with id: ${newNote.id} and appended it to the array` };
        }
        catch (error) {
            req.log.error(error);
            yield res.status(500).send("Error occurred when adding a note!");
        }
    });
}
exports.AddNoteController = AddNoteController;
function DeleteNoteController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { Note } = req.db.models;
            const { deletedCount } = yield Note.deleteOne({ _id: req.params.id });
            console.log(deletedCount);
            if (deletedCount === 0) {
                res.code(404);
                return { success: false, message: "Note could not be found!" };
            }
            res.code(201);
            return { success: true, message: "Note was successfully deleted!" };
        }
        catch (error) {
            req.log.error(error);
            yield res.status(500).send("An error occurred!");
        }
    });
}
exports.DeleteNoteController = DeleteNoteController;
function GetNotesCategoryController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { Note } = req.db.models;
            const notes = yield Note.find({
                category: req.params.category,
                userId: req.params.userId
            });
            return notes;
        }
        catch (error) {
            req.log.error(error);
            yield res.status(500).send("Error occurred when fetching notes!");
        }
    });
}
exports.GetNotesCategoryController = GetNotesCategoryController;
function DeleteNotesCategoryController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { Note } = req.db.models;
            const { category, userId } = req.params;
            const { deletedCount } = yield Note.deleteMany({
                category: category,
                userId: userId
            });
            if (deletedCount === 0) {
                res.code(404);
                return { success: false, message: `There are no notes with the category '${category}' to delete!` };
            }
            res.code(201);
            return { success: true, message: `All notes with the category '${category}' were deleted!` };
        }
        catch (error) {
            req.log.error(error);
            yield res.status(500).send("Error occurred when deleting all notes!");
        }
    });
}
exports.DeleteNotesCategoryController = DeleteNotesCategoryController;
function UpdateNoteController(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { Note } = req.db.models;
            const { id, userId } = req.body;
            yield Note.updateOne({ _id: id, userId: userId }, {
                title: req.body.title,
                shortDescription: req.body.shortDescription,
                content: req.body.content,
                category: req.body.category
            });
            res.code(201);
            return { success: true, message: `The note with the id '${id}' was updated!` };
        }
        catch (error) {
            req.log.error(error);
            yield res.status(500).send("Error occurred when deleting all notes!");
        }
    });
}
exports.UpdateNoteController = UpdateNoteController;

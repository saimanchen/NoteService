"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const NoteSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    shortDescription: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: Number, required: true },
    userId: { type: String, required: true }
}, { timestamps: true });
const Note = (0, mongoose_1.model)("Note", NoteSchema);
exports.default = Note;

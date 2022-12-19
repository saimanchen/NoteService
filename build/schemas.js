"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateNoteSchema = exports.DeleteNotesCategorySchema = exports.GetNotesCategorySchema = exports.DeleteNoteSchema = exports.AddNoteSchema = exports.DeleteAllNotesSchema = exports.GetNotesSchema = exports.LoginSchema = exports.RegisterSchema = void 0;
exports.RegisterSchema = {
    body: {
        type: "object",
        required: ["firstname", "lastname", "email", "password", "noteIds"],
        properties: {
            firstname: { description: "Firstname of the user", type: "string" },
            lastname: { description: "Lastname of the user", type: "string" },
            email: { description: "E-mail of the user", type: "string" },
            password: { description: "Password of the user", type: "string" },
            noteIds: { description: "List of note IDs of the user", type: "array" }
        }
    },
    response: {
        201: {
            description: "Successful response!",
            type: "object",
            properties: {
                success: { type: "boolean" },
                message: { type: "string" }
            }
        }
    }
};
exports.LoginSchema = {
    body: {
        type: "object",
        required: ["email", "password"],
        properties: {
            email: { description: "E-mail address of the user", type: "string" },
            password: { description: "Password of the user", type: "string" }
        }
    },
    response: {
        201: {
            description: "Successful response!",
            type: "object",
            properties: {
                success: { type: "boolean" },
                message: {
                    type: "object",
                    properties: {
                        token: { type: "string" }
                    }
                }
            }
        }
    }
};
exports.GetNotesSchema = {
    params: {
        type: 'object',
        additionalProperties: false,
        properties: { userId: { type: 'string' } }
    },
    response: {
        201: {
            description: "List of all notes",
            type: "array",
            items: {
                type: "object",
                properties: {
                    title: { description: "Title of the note", type: "string" },
                    shortDescription: {
                        description: "Short description of the note",
                        type: "string"
                    },
                    content: { description: "Content of the note", type: "string" }
                }
            }
        }
    }
};
exports.DeleteAllNotesSchema = {
    response: {
        201: {
            description: "Successful response",
            type: "object",
            properties: {
                success: { type: "boolean" },
                message: { type: "string" }
            }
        }
    }
};
exports.AddNoteSchema = {
    body: {
        type: "object",
        required: ["title", "shortDescription", "content", "category", "userId"],
        properties: {
            title: { description: "Title of the note", type: "string" },
            shortDescription: { description: "Short description of the note", type: "string" },
            content: { description: "Content of the note", type: "string" },
            category: { description: "Category of the note", type: "number" },
            userId: { description: "ID of the user which the note belongs to", type: "string" }
        }
    },
    response: {
        201: {
            description: "Successful response",
            type: "object",
            properties: {
                success: { type: "boolean" },
                message: { type: "string" }
            }
        }
    }
};
exports.DeleteNoteSchema = {
    params: {
        type: 'object',
        additionalProperties: false,
        properties: { id: { type: 'string' } }
    },
    response: {
        201: {
            description: "Delete status",
            type: "object",
            properties: {
                success: { type: "boolean" },
                message: { type: "string" }
            }
        }
    }
};
exports.GetNotesCategorySchema = {
    params: {
        type: 'object',
        additionalProperties: false,
        properties: {
            category: { type: "number" },
            userId: { type: "string" }
        }
    },
    response: {
        201: {
            description: "List of notes retrieved by category",
            type: "array",
            items: {
                type: "object",
                properties: {
                    title: { description: "Title of the note", type: "string" },
                    shortDescription: {
                        description: "Short description of the note",
                        type: "string"
                    },
                    content: { description: "ID of the user which the note belongs to", type: "string" }
                }
            }
        }
    }
};
exports.DeleteNotesCategorySchema = {
    params: {
        type: 'object',
        additionalProperties: false,
        properties: {
            category: { type: 'number' },
            userId: { type: 'string' }
        }
    },
    response: {
        201: {
            description: "Delete status",
            type: "object",
            properties: {
                success: { type: "boolean" },
                message: { type: "string" }
            }
        }
    }
};
exports.UpdateNoteSchema = {
    body: {
        type: "object",
        required: ["id"],
        properties: {
            id: { description: "id of the note to update", type: "string" },
            title: { description: "title of the note to update", type: "string" },
            shortDescription: { description: "short description of the note to update", type: "string" },
            content: { description: "content of the note to update", type: "string" },
            category: { description: "category of the note to update", type: "number" },
            userId: { description: "" }
        }
    },
    response: {
        201: {
            description: "Update status",
            type: "object",
            properties: {
                success: { type: "boolean" },
                message: { type: "string" }
            }
        }
    }
};

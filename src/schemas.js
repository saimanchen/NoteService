export const GetNotesSchema = {
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
}

export const DeleteAllNotesSchema = {
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
}

export const AddNoteSchema = {
  body: {
    type: "object",
    required: ["title", "shortDescription", "content", "category"],
    properties: {
      title: { description: "Title of the note", type: "string" },
      shortDescription: { description: "Short description of the note", type: "string" },
      content: { description: "Content of the note", type: "string" },
      category: { description: "Category of the note", type: "number" }
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
}

export const DeleteNoteSchema = {
  body: {
    type: "object", // definiera själv
    required: ["_id"], // definiera själv
    properties: {
      _id: { description: "id of the note to remove", type: "string" }
    } // definiera själv
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
}

export const GetNotesCategorySchema = {
  body: {
    type: "object",
    required: ["category"],
    properties: {
      category: { description: "category of the notes to retrieve", type: "number" }
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
          content: { description: "Content of the note", type: "string" }
        }
      }
    }
  }
}

export const DeleteNotesCategorySchema = {
  body: {
    type: "object", // definiera själv
    required: ["category"], // definiera själv
    properties: {
      category: { description: "category of the notes to remove", type: "number" }
    } // definiera själv
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
}
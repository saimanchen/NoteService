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
    type: "object", 
    required: ["_id"], 
    properties: {
      _id: { description: "id of the note to remove", type: "string" }
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
    type: "object", 
    required: ["category"], 
    properties: {
      category: { description: "category of the notes to remove", type: "number" }
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
}

export const UpdateNoteSchema = {
  body: {
    type: "object", 
    required: ["_id"], 
    properties: {
      _id: { description: "id of the note to update", type: "string" },
      title: { description: "title of the note to update", type: "string" },
      shortDescription: { description: "short description of the note to update", type: "string" },
      content: { description: "content of the note to update", type: "string" },
      category: { description: "category of the note to update", type: "number" },
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
}
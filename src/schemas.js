export const AddNoteSchema = {
  body: {
    type: "object",
    required: ["title", "shortDescription", "content"],
    properties: {
      title: { description: "Title of the note", type: "string" },
      shortDescription: { description: "Short description of the note", type: "string" },
      content: { description: "Content of the note", type: "string" }
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

export const GetNotesSchema = {
  response: {
    201: {
      description: "List of all notes",
      type: "array",
      items: {
        type: "object",
        properties: {
          title: { description: "Title of the note", type: "string" },
          content: { description: "Content of the note", type: "string" }
        }
      }
    }
  }
}

export const DeleteNoteSchema = {
  body: {
    type: "object", // definiera själv
    required: ["title"], // definiera själv
    properties: {
      title: { description: "Title of the note to remove", type: "string" }
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
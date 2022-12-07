export const AddNoteSchema = {
  body: {
    type: "object",
    required: ["title", "content"],
    properties: {
      title: { description: "Title of the note", type: "string" },
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
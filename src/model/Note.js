import { Schema, model } from "mongoose"

const NoteSchema = new Schema({
  title: { type: String, required: true },
  shortDescription: { type: String, required: true },
  content: { type: String, required: true }
}, { timestamps: true })

const Note = model("Note", NoteSchema)

export default Note
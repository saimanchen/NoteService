import { model, Schema } from "mongoose"
import { INote } from "../interfaces"

const NoteSchema = new Schema({
  title: { type: String, required: true },
  shortDescription: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: Number, required: true }
}, { timestamps: true })

const Note = model<INote>("Note", NoteSchema)

export default Note
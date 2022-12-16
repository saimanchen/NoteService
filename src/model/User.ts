import { Schema, model } from "mongoose"
import { IUser } from "../interfaces"

const UserSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true }
})

const User = model<IUser>("User", UserSchema)

export default User
import mongoose, { Schema, type Document } from "mongoose"

export interface IUser extends Document {
  name: string
  username: string
  email: string
  password: string
  role: "admin" | "buyer" | "seller"
  image?: string
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "buyer", "seller"], default: "buyer" },
    image: { type: String, default: "" },
  },
  { timestamps: true },
)

export const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema)

export default User

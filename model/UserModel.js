import { model, Schema } from "mongoose";
export const userSchema = {
    email: String,
    password: String,
    username: String,
    contactNumber: String,
}
export const UserModel = model("user",userSchema)
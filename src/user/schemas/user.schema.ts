import { Schema } from "mongoose";

export const UserSchema = new Schema({
    ci: { type: String, require: true},
    name: { type: String, require: true},
    lastname: { type: String, require: true},
    birthplace: String,
    birthdate: String,
    career: String
});
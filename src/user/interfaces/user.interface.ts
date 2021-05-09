import { Document } from "mongoose";

export interface User extends Document{
    readonly ci: String;
    readonly name: String;
    readonly lastname: String;
    readonly birthplace: String;
    readonly birthdate: String;
    readonly career: String;
}
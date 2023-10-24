import mongoose from "mongoose";
import connection from "../config/database.js";

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        dateOfBirth: {
            type: Date,
            require: true,
        },
        specialization: {
            type: String,
            require: true,
        },
        dateOfAdmission: {
            type: Date,
            require: true,
        },
        regNo: {
            type: String,
            require: true,
            unique: true,
        },
        hash: {
            type: String,
        },
        salt: {
            type: String,
        },
        admin: {
            type: String,
        },
    },
    {
        timestamps: true,
    }
);

export const User = connection.model("User", userSchema);

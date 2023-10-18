import mongoose from "mongoose";

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
        password: {
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
    },
    {
        timestamps: true,
    }
);

export const User = mongoose.model("User", userSchema);

import mongoose from "mongoose";

const enrollSchema = mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to the User model
            required: true
        },
        subjectId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Subject', // Reference to the Subject model
            required: true
        },
        grade: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true,
    }
);

export const Enroll = mongoose.model("Enroll", enrollSchema);
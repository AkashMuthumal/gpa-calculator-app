import mongoose from "mongoose";
import express, { request, response } from "express";
import { Enroll } from "../models/enrollModel.js";
import { User } from "../models/userModel.js";
import { Subject } from "../models/subjectModel.js";

const router = express.Router();

// Route for get all enrollments
router.get("/", async (request, response) => {
    try {
        const enrollments = await Enroll.find();

        if (enrollments.length > 0) {
            return response.status(201).json({
                count: enrollments.length,
                data: enrollments,
            });
        } else {
            return response
                .status(404)
                .json({ message: "No enrollments found." });
        }
    } catch (error) {
        console.log(error.message);
        return response
            .status(500)
            .json({ error: "An error occurred while fetching enrollments." });
    }
});

// Route for get enrollment by id
router.get("/:id", async (request, response) => {
    try {
        const { id } = request.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return response.status(400).send({
                message: `Invalid enrollment id`,
            });
        }

        const enroll = await Enroll.findById(id).exec();

        if (enroll) {
            return response.status(200).json(enroll);
        } else {
            return response
                .status(404)
                .json({ message: "Enrollment not found." });
        }
    } catch (error) {
        console.log(error.message);
        return response
            .status(500)
            .json({ error: "An error occurred while fetching enrollment." });
    }
});

// Route for get enrollment by user id
router.get("/user/:id", async (request, response) => {
    try {
        const { id } = request.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return response.status(400).send({
                message: `Invalid enrollment id`,
            });
        }

        const user = await User.findById(id).exec();

        if (!user) {
            return response.status(404).json({ message: "User not found." });
        }

        const enrollments = await Enroll.find({ userId: id }).exec();

        if (enrollments.length > 0) {
            return response.status(200).json({
                count: enrollments.length,
                data: enrollments,
            });
        } else {
            return response
                .status(404)
                .json({ message: "No enrollments found." });
        }
    } catch (error) {
        console.log(error.message);
        return response
            .status(500)
            .json({ error: "An error occurred while fetching enrollment." });
    }
});

// Route for get enrollment by subject id
router.get("/subject/:id", async (request, response) => {
    try {
        const { id } = request.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return response.status(400).send({
                message: `Invalid enrollment id`,
            });
        }

        const subject = await Subject.findById(id).exec();

        if (!subject) {
            return response.status(404).json({ message: "Subject not found." });
        }

        const enrollments = await Enroll.find({ subjectId: id }).exec();

        if (enrollments.length > 0) {
            return response.status(200).json({
                count: enrollments.length,
                data: enrollments,
            });
        } else {
            return response
                .status(404)
                .json({ message: "No enrollments found." });
        }
    } catch (error) {
        console.log(error.message);
        return response
            .status(500)
            .json({ error: "An error occurred while fetching enrollment." });
    }
});

// Route for Save a new Enroll
router.post("/", async (request, response) => {
    try {
        // Input validation
        if (
            !request.body.userId ||
            !request.body.subjectId ||
            !request.body.grade
        ) {
            return response.status(400).send({
                message: `Send all required fields: userId, subjectId, grade`,
            });
        }

        if (!mongoose.Types.ObjectId.isValid(request.body.userId)) {
            return response.status(400).send({
                message: `Invalid user id`,
            });
        }

        if (!mongoose.Types.ObjectId.isValid(request.body.subjectId)) {
            return response.status(400).send({
                message: `Invalid subject id`,
            });
        }

        const { userId, subjectId, grade } = request.body;

        // Check whether user or subject exist
        const user = await User.findById(userId).exec();
        const subject = await Subject.findById(subjectId).exec();

        if (!user) {
            return response.status(404).json({ message: "User not found." });
        }

        if (!subject) {
            return response.status(404).json({ message: "Subject not found." });
        }

        // Check if the user is already enrolled in the same subject
        const existingEnrollment = await Enroll.findOne({
            userId,
            subjectId,
        }).exec();

        if (existingEnrollment) {
            return response
                .status(400)
                .json({ message: "User is already enrolled in this subject." });
        }

        // Creating new enrollment
        const newEnroll = {
            userId,
            subjectId,
            grade,
        };

        const enroll = await Enroll.create(newEnroll);
        return response.status(201).send(enroll);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for update a Enrollment
router.put("/:id", async (request, response) => {
    try {
        if (!request.body.grade) {
            return response.status(400).send({
                message: `Send all required fields: grade`,
            });
        }

        const { id } = request.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return response.status(400).send({
                message: `Invalid enrollment id`,
            });
        }

        const result = await Enroll.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).send({
                message: `Enrollment not found`,
            });
        }

        return response.status(200).send({
            message: `Enrollment successfully updated!`,
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for delete enrollment by id
router.delete("/:id", async (request, response) => {
    try {
        const { id } = request.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return response.status(400).send({
                message: `Invalid user id`,
            });
        }

        const result = await Enroll.findByIdAndRemove(id);

        if (result) {
            return response.status(404).json({
                message: `Enrollment successfully deleted!`,
            });
        } else {
            return response
                .status(404)
                .json({ message: "Enrollment not found." });
        }
    } catch (error) {
        console.log(error.message);
        return response
            .status(500)
            .json({ error: "An error occurred while fetching enrollment." });
    }
});

export default router;

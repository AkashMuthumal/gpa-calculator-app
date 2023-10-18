import mongoose from "mongoose";
import express, { request, response } from "express";
import { User } from "../models/userModel.js";

const router = express.Router();

// Route for get all users
router.get("/", async (request, response) => {
    try {
        const users = await User.find();

        if (users.length > 0) {
            return response.status(201).json({
                count: users.length,
                data: users,
            });
        } else {
            return response.status(404).json({ message: "No users found." });
        }
    } catch (error) {
        console.log(error.message);
        return response
            .status(500)
            .json({ error: "An error occurred while fetching users." });
    }
});

// Route for get user by id
router.get("/:id", async (request, response) => {
    try {
        const { id } = request.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return response.status(400).send({
                message: `Invalid user id`,
            });
        }

        const user = await User.findById(id).exec();

        if (user) {
            return response.status(200).json(user);
        } else {
            return response.status(404).json({ message: "User not found." });
        }
    } catch (error) {
        console.log(error.message);
        return response
            .status(500)
            .json({ error: "An error occurred while fetching users." });
    }
});

// Route for Save a new User
router.post("/", async (request, response) => {
    try {
        if (
            !request.body.name ||
            !request.body.dateOfBirth ||
            !request.body.specialization ||
            !request.body.password ||
            !request.body.dateOfAdmission ||
            !request.body.regNo
        ) {
            return response.status(400).send({
                message: `Send all required fields: name, dateOfBirth, specialization, password, dateOfAdmission, regNo`,
            });
        }
        const newUser = {
            name: request.body.name,
            dateOfBirth: new Date(request.body.dateOfBirth),
            specialization: request.body.specialization,
            password: request.body.password, // use bcrypt or something
            dateOfAdmission: new Date(request.body.dateOfAdmission),
            regNo: request.body.regNo,
        };

        const user = await User.create(newUser);
        return response.status(201).send(user);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for update a User
router.put("/:id", async (request, response) => {
    try {
        if (
            !request.body.name ||
            !request.body.dateOfBirth ||
            !request.body.specialization ||
            !request.body.password ||
            !request.body.dateOfAdmission ||
            !request.body.regNo
        ) {
            return response.status(400).send({
                message: `Send all required fields: name, dateOfBirth, specialization, password, dateOfAdmission, regNo`,
            });
        }
        
        const { id } = request.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return response.status(400).send({
                message: `Invalid user id`,
            });
        }

        const result = await User.findByIdAndUpdate(id, request.body);

        if(!result) {
            return response.status(404).send({
                message: `User not found`,
            })
        }

        return response.status(200).send({
            message: `User successfully updated!`,
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for delete user by id
router.delete("/:id", async (request, response) => {
    try {
        const { id } = request.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return response.status(400).send({
                message: `Invalid user id`,
            });
        }

        const result = await User.findByIdAndRemove(id);

        if (result) {
            return response.status(404).json({
                message: `User successfully deleted!`
            });
        } else {
            return response.status(404).json({ message: "User not found." });
        }
    } catch (error) {
        console.log(error.message);
        return response
            .status(500)
            .json({ error: "An error occurred while fetching users." });
    }
});


export default router;

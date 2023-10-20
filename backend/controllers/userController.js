import mongoose from "mongoose";
import { User } from "../models/userModel.js";

export async function getAllUsers(request, response) {
    try {
        const users = await User.find();

        if (users.length > 0) {
            return response.status(200).json({
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
}

export async function getUserById(request, response) {
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
}

export async function saveNewUser(request, response) {
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
}

export async function updateUser(request, response) {
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

        if (!result) {
            return response.status(404).send({
                message: `User not found`,
            });
        }

        return response.status(200).send({
            message: `User successfully updated!`,
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
}

export async function deleteUserById(request, response) {
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
                message: `User successfully deleted!`,
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
}

export async function getUserByName(request, response) {
    try {
        const { name } = request.params;

        const user = await User.find({ name: name }).exec();

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
}
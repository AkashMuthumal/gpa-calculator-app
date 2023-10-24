import express from "express";
import { isAdmin, isAuth, isOwner } from "../middleware/authMiddleware.js";

import {
    getAllUsers,
    getUserById,
    saveNewUser,
    updateUser,
    deleteUserById,
    getUserByName,
} from "../controllers/userController.js";

const router = express.Router();

// Route for get all users
router.get("/", isAdmin, getAllUsers);

// Route for get user by id
router.get("/:id", isOwner, getUserById);

// Route for Save a new User
router.post("/", isAdmin, saveNewUser);

// Route for update a User
router.put("/:id", isOwner, updateUser);

// Route for delete user by id
router.delete("/:id", isOwner, deleteUserById);

// Route for get user by name
router.get("/name/:name", isAdmin, getUserByName);

export default router;
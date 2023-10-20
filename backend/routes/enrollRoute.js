import express from "express";

import {
    getAllEnrollments,
    getEnrollmentById,
    getEnrollmentByUserId,
    getEnrollmentBySubjectId,
    saveNewEnroll,
    updateEnrollment,
    deleteEnrollmentById,
} from "../controllers/enrollController.js";

const router = express.Router();

// Route for get all enrollments
router.get("/", getAllEnrollments);

// Route for get enrollment by id
router.get("/:id", getEnrollmentById);

// Route for get enrollment by user id
router.get("/user/:id", getEnrollmentByUserId);

// Route for get enrollment by subject id
router.get("/subject/:id", getEnrollmentBySubjectId);

// Route for Save a new Enroll
router.post("/", saveNewEnroll);

// Route for update a Enrollment
router.put("/:id", updateEnrollment);

// Route for delete enrollment by id
router.delete("/:id", deleteEnrollmentById);

export default router;

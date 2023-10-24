import express from "express";
import passport from "passport";

import { saveNewUser } from "../controllers/userController.js";
import { isAuth } from "../middleware/authMiddleware.js";

const router = express.Router();

// Route for get all users
router.post("/register", saveNewUser);

// Route for Save a new User
router.post(
    "/login",
    passport.authenticate("local", {
        failureRedirect: "/auth/login-failure",
        successRedirect: "/auth/login-success",
    })
);

router.get("/login-failure", (req, res) => {
    return res.status(401).send("error: unauthorized");
});

router.get("/login-success", (req, res) => {
    const data = {
        username: req.user.name,
        userId: req.user._id,
    };
    return res.status(200).send(data);
});

router.get("/logout", isAuth, (req, res, next) => {
    req.logout((err) => {
        if (err) {
            res.status(500).send(`server error ${err}`);
        } else {
            res.status(200).send("logout successful");
        }
    });
});

export default router;

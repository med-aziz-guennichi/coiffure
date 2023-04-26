import express from "express";
import { loginUser, registerUser } from "../controllers/authController.js";

const AuthRoutes = express.Router();

//Register User
AuthRoutes.post("/register", registerUser);

// Login User
AuthRoutes.post("/login", loginUser);

export default AuthRoutes;

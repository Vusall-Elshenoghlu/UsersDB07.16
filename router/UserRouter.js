import express from "express"
import UserController from "../controller/UserController.js";

export const userRoute = express.Router();

userRoute.get("/", UserController.getAll);
userRoute.post("/register", UserController.register);
userRoute.post("/login", UserController.login);

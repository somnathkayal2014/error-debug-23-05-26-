import express from "express";
import { login, register } from "../controller/todoController.js";
import { verification } from "../middleware/tokenVerify.js";

const userRoute = express.Router();

userRoute.post("/create", register);
userRoute.get("/verify", verification);
userRoute.post("/login", login);

export default userRoute;

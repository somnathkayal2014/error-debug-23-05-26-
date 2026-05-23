import express from "express";
import { createTodo } from "../controller/todoControllerTwo.js";
import { hasToken } from "../middleware/hasToken.js";

const userRouteTwo = express.Router();

userRouteTwo.post("/createTwo",  createTodo);

export default userRouteTwo;

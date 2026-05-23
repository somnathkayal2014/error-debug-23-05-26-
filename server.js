import express from "express";
import { dbConnect } from "./src/config/dbConnect.js";
import userRoute from "./src/route/todoRoute.js";
import dotenv from "dotenv/config";
import userRouteTwo from "./src/route/todoRouteTwo.js";

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use("/user", userRoute);
app.use("/todo", userRouteTwo);

dbConnect();

app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});

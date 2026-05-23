import mongoose from "mongoose";
import dotenv from "dotenv/config";

const url = process.env.mongoURL;

export async function dbConnect() {
  try {
    await mongoose.connect(url);
    console.log("mongoDB connected");
  } catch (error) {
    console.log("mongoDB not connected", error);
  }
}

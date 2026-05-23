import todoSchema from "../models/todoSchema.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv/config";
import Jwt from "jsonwebtoken";
import { verifyMail } from "../verificationMail/verifyMail.js";

export const register = async (req, res) => {
  try {
    const { userName, Email, Password } = req.body;
    const existing = await todoSchema.findOne({ Email });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Email Already Registered",
      });
    }
    const hashPassword = await bcrypt.hash(Password, 10);
    const user = await todoSchema.create({
      userName,
      Email,
      Password: hashPassword,
    });
    const token = Jwt.sign({ id: user._id }, process.env.secretKey, {
      expiresIn: "5m",
    });
    verifyMail(token, Email);

    user.token = token;
    await user.save();
    
    return res.status(201).json({
      success: true,
      message: "Todo created successfully",
      data: user,
      token: token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const user = await todoSchema.findOne({ Email: Email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized Access!",
      });
    } else {
      const passwordCheck = await bcrypt.compare(Password, user.Password);
      if (!passwordCheck) {
        return res.status(401).json({
          success: false,
          message: "Incorrect Password",
        });
      } else if (passwordCheck && user.isVerified) {
        const accessToken = Jwt.sign(
          { userID: user._id },
          process.env.secretKey,
          {
            expiresIn: "10days",
          },
        );
        const refreshToken = Jwt.sign(
          { userID: user._id },
          process.env.secretKey,
          {
            expiresIn: "30days",
          },
        );
        user.isLoggedIn = true;
        await user.save();
        return res.status(200).json({
          success: true,
          message: "Hurray",
          accessToken: accessToken,
          refreshToken: refreshToken,
          data: user,
        });
      } else {
        return res.status(401).json({
          success: false,
          message: "Complete Verification First",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

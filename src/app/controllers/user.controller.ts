import { Request, Response } from "express";
import app from "../../app";
import express from "express";
import { User } from "../models/user.model";

export const userRoutes = express.Router();

userRoutes.post("/create-user", async (req: Request, res: Response) => {
  const body = req.body;
  const user = await User.create(body);

  res.status(201).json({
    success: true,
    message: "Users Created Successfully !",
    user: user,
  });
});

userRoutes.patch("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const updatedUser = req.body;
  const user = await User.findByIdAndUpdate(userId, updatedUser, { new: true });

  res.status(201).json({
    success: true,
    message: "User Updated Successfully !",
    user: user,
  });
});

userRoutes.get("/", async (req: Request, res: Response) => {
  const users = await User.find();

  res.status(201).json({
    success: true,
    message: "Users Retrieved Successfully !",
    users: users,
  });
});

userRoutes.get("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;

  const user = await User.findById(userId);

  res.status(201).json({
    success: true,
    message: "User Retrieved Successfully !",
    user: user,
  });
});

userRoutes.delete("/:userId", async (req: Request, res: Response) => {
  const userId = req.params.userId;
  const user = await User.findByIdAndDelete(userId);

  res.status(201).json({
    success: true,
    message: "User Deleted Successfully !",
    user: user,
  });
});

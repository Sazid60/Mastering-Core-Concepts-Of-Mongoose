import express, { Application, NextFunction, Request, Response } from "express";
import { model, Schema } from "mongoose";

const app: Application = express();

// 1. create schema
const noteSchema = new Schema({
  title: { type: String, required: true, trim: true },
  content: { type: String, default: "" },
  category: {
    type: String,
    enum: ["personal", "work", "study", "others"],
    default: "personal",
  },
  pinned: {
    type: Boolean,
    default: false,
  },
  tags: {
    label: { type: String, required: true },
    color: { type: String, default: "gray" },
  },
});

// 2. Create Model
const Note = model("Note", noteSchema);

// 3. Insert data using the model
app.post("/create-note", async (req: Request, res: Response) => {
  // res.send("Welcome To Todo App");
  const myNote = new Note({
    title: "Node",
    // tags: {
    //   label: "database",
    // },
  });

  await myNote.save();

  res.status(201).json({
    success: true,
    message: "Note Created Successfully !",
    note: myNote,
  });
});
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome To Todo App");
});
export default app;

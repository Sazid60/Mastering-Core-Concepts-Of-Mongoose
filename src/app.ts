import express, { Application, NextFunction, Request, Response } from "express";
import { model, Schema } from "mongoose";

const app: Application = express();

// 1. create schema
const noteSchema = new Schema({
  title: String,
  content: String,
});

// 2. Create Model
const Note = model("Note", noteSchema);

// 3. Insert data using the model
app.post("/create-note", async (req: Request, res: Response) => {
  // res.send("Welcome To Todo App");
  const myNote = new Note({
    title: "Mongoose",
    content: "I am Learning Mongoose",
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

import express, { Application, NextFunction, Request, Response } from "express";
import { model, Schema } from "mongoose";

const app: Application = express();

app.use(express.json());

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
app.post("/notes/create-note", async (req: Request, res: Response) => {
  const body = req.body;
  const note = await Note.create(body);

  res.status(201).json({
    success: true,
    message: "Note Created Successfully !",
    note: note,
  });
});
// get all notes
app.get("/notes", async (req: Request, res: Response) => {
  const notes = await Note.find();

  res.status(201).json({
    success: true,
    message: "Notes Retrieved Successfully !",
    note: notes,
  });
});

app.get("/notes/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;
  const note = await Note.findById(noteId);
  // const note = await Note.findOne({ _id: noteId });

  res.status(201).json({
    success: true,
    message: "Note Retrieved Successfully !",
    note: note,
  });
});

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome To Todo App");
});
export default app;

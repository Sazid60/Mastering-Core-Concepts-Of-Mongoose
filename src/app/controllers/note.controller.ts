import { Request, Response } from "express";
import { Note } from "../models/note.model";
import express from "express";

export const noteRoutes = express.Router();

// 3. Insert data using the model
noteRoutes.post("/create-note", async (req: Request, res: Response) => {
  const body = req.body;
  const note = await Note.create(body);

  res.status(201).json({
    success: true,
    message: "Note Created Successfully !",
    note: note,
  });
});
// get all notes
noteRoutes.get("/", async (req: Request, res: Response) => {
  const notes = await Note.find();

  res.status(201).json({
    success: true,
    message: "Notes Retrieved Successfully !",
    note: notes,
  });
});

noteRoutes.get("/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;
  const note = await Note.findById(noteId);
  // const note = await Note.findOne({ _id: noteId });

  res.status(201).json({
    success: true,
    message: "Note Retrieved Successfully !",
    note: note,
  });
});

// update a note

noteRoutes.patch("/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;
  const updatedBody = req.body;
  const note = await Note.findByIdAndUpdate(noteId, updatedBody, { new: true });
  res.status(201).json({
    success: true,
    message: "Note Updated Successfully !",
    note: note,
  });
});

// delete a note

noteRoutes.delete("/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;

  const note = await Note.findByIdAndDelete(noteId);

  res.status(201).json({
    success: true,
    message: "Note Deleted Successfully !",
    note: note,
  });
});

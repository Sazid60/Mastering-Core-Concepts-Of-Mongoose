import express, { Application, NextFunction, Request, Response } from "express";
import { model, Schema } from "mongoose";

const app: Application = express();

app.use(express.json());

// 1. create schema
const noteSchema = new Schema(
  {
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
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

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

// update a note

app.patch("/notes/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;
  const updatedBody = req.body;

  // method:1 (Appropriate Method)
  const note = await Note.findByIdAndUpdate(noteId, updatedBody, { new: true });
  //  here {new:true} means It will give us the updated data after update

  // method:2  (less appropriate than findByIdAndUpdate)
  // const note = await Note.findOneAndUpdate({ _id: noteId }, updatedBody, {
  //   new: true,
  // });
  // It Will find the document and then update and it will show data after update.

  // method:3 (less appropriate)
  // const note = await Note.updateOne({ _id: noteId }, updatedBody, {
  //   new: true,
  // });
  // This will just show the mongodb update return after update
  //   {
  // Mongodb Update Return
  //     "success": true,
  //     "message": "Note Updated Successfully !",
  //     "note": {
  //         "acknowledged": true,
  //         "modifiedCount": 0,
  //         "upsertedId": null,
  //         "upsertedCount": 0,
  //         "matchedCount": 1
  //     }
  // }

  res.status(201).json({
    success: true,
    message: "Note Updated Successfully !",
    note: note,
  });
});

// delete a note

app.delete("/notes/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;

  // method-1 (appropriate)
  const note = await Note.findByIdAndDelete(noteId);

  // method-2
  // const note = await Note.findOneAndDelete({_id : noteId})

  // method-3 (not appropriate)
  // const note = await Note.deleteOne({_id : noteId})

  res.status(201).json({
    success: true,
    message: "Note Deleted Successfully !",
    note: note,
  });
});

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome To Todo App");
});
export default app;

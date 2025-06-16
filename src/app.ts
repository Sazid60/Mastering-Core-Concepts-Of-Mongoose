import express, { Application, NextFunction, Request, Response } from "express";
import { noteRoutes } from "./app/controllers/note.controller";

const app: Application = express();

app.use(express.json());

app.use("/notes", noteRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome To Todo App");
});
export default app;

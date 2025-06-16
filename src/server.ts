import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";

let server: Server;

const PORT = 5000;

async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://:@cluster0.cjbmdks.mongodb.net/note-app?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Connected To Mongodb Using Mongoose!");
    server = app.listen(PORT, () => {
      console.log(`APP IS LISTENING ON PORT ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();

# Mastering-The-Core-Concepts-Of-Mongoose

In this module, we’ll dive deep into Mongoose, one of the most powerful and widely-used Object Data Modeling (ODM) libraries for MongoDB in the Node.js ecosystem.

If you're working with MongoDB, Mongoose makes your life easier by offering a schema-based solution to model your application data with built-in type checking, validation, and a rich set of features for querying and transforming data.

Throughout this module, you'll:

Understand what Mongoose is and why it’s essential for MongoDB projects.
Set up Mongoose in a real-world Note-taking App project.
Create schemas and models, define required fields and types.
Perform core CRUD operations: Create, Read, Update, and Delete notes.
Explore schema options like timestamps and versionKey.
Learn how to structure your project professionally using models, routes, services, and controllers.
Integrate TypeScript with Mongoose for type safety and scalability.
Build a complete User model with interfaces and CRUD functionalities.

By the end of this module, you’ll not only master Mongoose’s core features but also build a solid foundation for building scalable, maintainable, and type-safe MongoDB applications.

Let’s get started on the path to becoming a MongoDB + Mongoose pro!

## 17-1 What is Mongoose and Why Use It with MongoDB

[Mongoose-Blog](https://www.freecodecamp.org/news/introduction-to-mongoose-for-mongodb-d2a7aa593c57/)

- Mongodb Is a Unstructured Database. There is problem with the mongodb database like- suppose we have products data. some how some users data is pushed inside product data mongodb wont mind. This will be total mess.
- Here come Mongoose With help. Mongoose Creates a Layer Over the Mongodb and it prevents wrong data to be pushed. Like Products data collection will not allow to push any other type data. Mongoose will validate.

![alt text](image.png)

- Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB.

- We can store some unstructured data in mongodb. If there exists different structured data in one collection we can not work. For this reason we will use mongoose. Its like it will check and allow to enter if its valid data. It will not allow to keep the unstructured data according to our modeling. Mongoose will work lie abstraction here.

- Sent data -> Compares with he modeling by mapping -> If valid It will allow to keep data by using mongodb driver

- Here we will not directly use mongodb functionalities. We will use Mongoose Functionalities which will give us super power to follow a model(blue print) and gives us some facilities like validation and others.

- Mongoose will connect with Mongodb Using Mongodb Driver.

- MongoDB is a schema-less NoSQL document database. It means you can store JSON documents in it, and the structure of these documents can vary as it is not enforced like SQL databases. This is one of the advantages of using NoSQL as it speeds up application development and reduces the complexity of deployments.

##### SQL Has by default validation but mongodb do not have. Here Mongoose helps to validate

##### Mongoose is Giving a vibe of SQL to the NoSQL database Mongodb

#### Mongodb Vs Mongoose Queries

| **Operation**           | **MongoDB Native** | **Mongoose**                                                |
| ----------------------- | ------------------ | ----------------------------------------------------------- |
| Find all documents      | `find()`           | `Model.find()`                                              |
| Find one document       | `findOne()`        | `Model.findOne()`                                           |
| Count documents         | `count()`          | `Model.countDocuments()` / `Model.estimatedDocumentCount()` |
| Update by ID            | `update()`         | `Model.findByIdAndUpdate()`                                 |
| Delete by ID            | -                  | `Model.findByIdAndDelete()`                                 |
| Create document         | -                  | `Model.create()`                                            |
| Find by ID              | -                  | `Model.findById()`                                          |
| Delete one by condition | -                  | `Model.findOneAndDelete()`                                  |
| Replace document        | `replaceOne()`     | `Model.replaceOne()`                                        |
| Update multiple docs    | `updateMany()`     | `Model.updateMany()`                                        |
| Update one document     | `updateOne()`      | `Model.updateOne()`                                         |

#### Why Learn Mongoose?

- Simplifies MongoDB operations with built-in schema validation.
- Reduces boilerplate code for database interactions.
- Supports middleware for pre/post operations.
- Well-suited for Node.js applications.
- Schema Definition
- Model Creation
- Queries

[Mongoose-Docs-2](https://www.geeksforgeeks.org/node-js/mongoose-tutorial/)

## 17-2 Setting Up Mongoose in Note App Project

[Mongoose Official Docs](https://mongoosejs.com/docs/index.html)

#### Installation

- **Step-1 :** initiate

```
npm init -y
```

- **Step-2 :** Install Typescript In Dev Dependency. Dev Dependency means This package will not be used in production. It will be used in development time. Ts has no works in live site, its just for developers.

```
npm install -D typescript
```

- **Step-3 :** Install Express and Mongoose as Main Dependency since we will need it in production as well. Install The Types declaration Of Express as well

```
npm install express mongoose
```

```
npm i --save-dev @types/express
```

- **Step-4 :** Install Ts globally

```
npm install -g typescript
```

- **Step-5 :** Bring the Typescript Config File

```
 tsc --init
```

- **Step-6 :** Set the Ts and js file directory in tsconfig.json file

```json
"rootDir": "./src/"
"outDir": "./dist/"
```

- **Step-7 :** Create Folders and files. all application related file will be in application folder. Server file will handle the server related tasks and app related tasks will be in app.ts. server.ts and app.ts are the entry point like index.js we have separated the files. app.ts is the entry point of application and server.ts is the entry point of server.

- **Step-8 :** Install MongoDB

```
npm install mongodb
```

- **Step-9 :** Install TS-NODE-DEV instead of using nodemon(restarting server for any changes in dist folder js files) and tsc-w(typescript Compiler).

```
npm i ts-node-dev --save-dev
```

This will directly run the server on typescript. no need to transpile to js anymore.

- **Step-9 :** Lets write a script for the running command of Ts node dev

```json
  "scripts": {
    "dev": "ts-node-dev --respawn --transpile-only src/server.ts",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

- Run the server

```
npm run dev
```

#### App.ts

```js
import express, { Application, NextFunction, Request, Response } from "express";
const app: Application = express();
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome To Todo App");
});
export default app;
```

#### Server.ts

```js
import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";

let server: Server;

const PORT = 5000;

async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://sazid-mongo:sazid-mongo@cluster0.cjbmdks.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
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
```

## 17-3 Creating Your First Mongoose Schema and Model

#### Schema

- While Mongo is schema-less, SQL defines a schema via the table definition. A Mongoose schema is a document data structure (or shape of the document) that is enforced via the application layer.

#### SchemaTypes

- While Mongoose schemas define the overall structure or shape of a document, SchemaTypes define the expected data type for individual fields (String, Number, Boolean, and so on).

- You can also pass in useful options like required to make a field non-optional, default to set a default value for the field, and many more.

#### Models

- Models are higher-order constructors that take a schema and create an instance of a document equivalent to records in a relational database.
- Using the Schema/Blueprint The Model (Builder) will prepare a document. If any element is missing the model will not build the document.
- Previously we were used to create document in mongodb directly. But new on we will use Model and model will look at schema and will prepare a document.

```js
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
    // any unnecessary fields rather than the schema will not be posted and the types will be strictly followed.
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
```

## 17-4 Understanding Data Types and Required Fields in Schema

[Schema Types](https://mongoosejs.com/docs/guide.html)

#### Different Style of Defining Schema types

```js
import mongoose from "mongoose";
const { Schema } = mongoose;

const blogSchema = new Schema({
  title: String, // String is shorthand for {type: String}
  author: String,
  body: String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs: Number,
  },
});
```

#### Enum Types in Schema

```js
const enum = {
  values: ["opening", "open", "closing", "closed"],
  message: "enum validator failed for path `{PATH}` with value `{VALUE}`",
};
```

or

```js
const category = {
  type: String,
  enum : ["A", "B", "C"]
  default : "A"
}
```

#### Implementing Schema Types In Our Project

```js
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
    tags: {
      label: "database",
    },
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
```

## 17-5 Create and Save a Note, Get All and Single Notes

#### Insert a note

```js
app.post("/notes/create-note", async (req: Request, res: Response) => {
  const body = req.body;
  const note = await Note.create(body);

  res.status(201).json({
    success: true,
    message: "Note Created Successfully !",
    note: note,
  });
});
```

#### Get All Notes

```js
app.post("/notes/create-note", async (req: Request, res: Response) => {
  const body = req.body;
  const note = await Note.create(body);

  res.status(201).json({
    success: true,
    message: "Note Created Successfully !",
    note: note,
  });
});
```

#### Get a Single Note

- using Mongodb Id and findById. This will be only Mongodb Id Field

```js
const noteId = req.params.noteId;
const note = await Note.findById(noteId);
```

- Using FindOne. This can be any field

```js
const noteId = req.params.noteId;
const note = await Note.findOne({ _id: noteId });
```

- Final Code

```js
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
```

## 17-6 Update and Delete a Note, Schema Options: timestamps, versionKey

#### Update a Note

```js
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
```

#### Delete a Document

```js
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
```

#### VersionKey

![alt text](image-1.png)

- By Using This Mongodb data updating is traced.When a document is updated ath eversion key changes
- This not basically used. we can remove the \_\_v from database

```js
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
  }
);
```

![alt text](image-2.png)

#### Timestamp

- It Gives us Creation Time and Update time

```js
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
```

![alt text](image-3.png)

## 17-7 Project Structuring: Models, Routes, Services, Controllers

#### We will Not Keep all the works in the same app file. we will follow `MVC` Pattern for splitting all the works in different modules.

- Full form of `MVC` is Model, View, Controller

**Model:** Manages and stores the data of the application.

_What it is:_ The part of the application that manages the data, logic, and rules. Connects with mongodb and sets a data structure and make to follow the structure.

- Role:

1. Retrieves data from the database.

2. Updates the data when the user interacts.

3. Notifies the view if the data changes.

**Example:** If you're building a blog, the Model would be the Post object with properties like title, content, and methods to save() or delete() a post.

**View:** Displays the data to the user in a user-friendly way. Most Of The View Works will be done by react now.

_What it is:_ The UI (User Interface) of the application.

- Role:

1. Displays data to the user (usually from the model).

2. Sends user interactions (like button clicks) to the controller.

**Example:** The blog page that shows a list of posts, each with its title and content.

**Controller:** Handles user input and updates the Model and View.

_What it is:_ The part that connects the Model and the View. Receives user request and based on the request do the operation by connecting with database and sends response.

- Role:

1. Takes user input from the view.

2. Processes it (e.g., validating form data).

3. Calls the appropriate method on the model.

4. May tell the view to update.

**Example:** The blog page that shows a list of posts, each with its title and content.

- Model = Kitchen (prepares data, i.e., the food)

- View = Menu + Table (what the user sees)

- Controller = Waiter (takes orders from user, tells kitchen, brings food)

#### note.model.ts

```js
import { model, Schema } from "mongoose";

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
export const Note = model("Note", noteSchema);
```

#### note.controller.ts

```js
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
```

#### app.ts

```js
import express, { Application, NextFunction, Request, Response } from "express";
import { noteRoutes } from "./app/controllers/note.controller";

const app: Application = express();

app.use(express.json());

app.use("/notes", noteRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome To Todo App");
});
export default app;
```

## 17-8 Integrating Typescript with Mongoose And Making User Model

- Follow the interface, model and controller codes

## 17-9 User CRUD Operations and Making interface for Notes Schema

- See Codes

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import booksRoute from "./routes/booksRoute.js";

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS policy
app.use(cors());

const PORT = process.env.PORT || 5555;
const mongoDBURL =
  process.env.MONGODB_URL ||
  "mongodb+srv://root:root@storysage-mern.8wqzdgn.mongodb.net/books-collection?retryWrites=true&w=majority";
app.use("/books", booksRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App is listening to ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

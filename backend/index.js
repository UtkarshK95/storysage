import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import booksRoute from "./routes/booksRoute.js";

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS policy
app.use(
  cors({
    allowedHeaders: ["authorization", "Content-Type"], // you can change the headers
    exposedHeaders: ["authorization"], // you can change the headers
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
  })
);

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
    const userWelcome = (req, res) => {
      res.send("Welcome to Story Sage");
    };

    app.get("/", userWelcome);
  })
  .catch((error) => {
    console.log(error);
  });

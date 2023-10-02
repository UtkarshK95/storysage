import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// Middleware to validate book data
const validateBookData = (request, response, next) => {
  const { title, author, publishYear } = request.body;
  if (!title || !author || !publishYear) {
    return response.status(400).send({
      message: "Send all required fields: title, author, publishYear",
    });
  }
  next();
};

// Route to save a new book
router.post("/", validateBookData, async (request, response) => {
  try {
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };

    const book = await Book.create(newBook);
    return response.status(201).send(book);
  } catch (error) {
    console.error(error.message);
    response.status(500).send({ message: "Internal Server Error" });
  }
});

// Route for get all books from the database
router.get("/", async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.error(error.message);
    response.status(500).send({ message: "Internal Server Error" });
  }
});

// Route to Get one book from the database by id
router.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const book = await Book.findById(id);

    if (!book) {
      return response.status(404).json({ message: "Book not found" });
    }

    return response.status(200).json(book);
  } catch (error) {
    console.error(error.message);
    response.status(500).send({ message: "Internal Server Error" });
  }
});

// Route to update a book
router.put("/:id", validateBookData, async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Book.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: "Book not found" });
    }

    return response.status(200).send({ message: "Book updated successfully" });
  } catch (error) {
    console.error(error.message);
    response.status(500).send({ message: "Internal Server Error" });
  }
});

// Route to delete a book
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "Book not found" });
    }

    return response.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    console.error(error.message);
    response.status(500).send({ message: "Internal Server Error" });
  }
});

export default router;

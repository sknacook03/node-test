import express from "express";
const BookRouter = express.Router();
import BookController from "./controllers/book.controller.js";
import { createValidator } from "express-joi-validation";
import { CreateBookDto } from "./dto/create-book.dto.js";
import { UpdateBookDto } from './dto/update-book.dto.js'
const validator = createValidator(); 

BookRouter .post("/", validator.body(CreateBookDto), BookController.createBook);
BookRouter .patch('/:id', validator.body(UpdateBookDto), BookController.updateBook)
BookRouter .get('/', BookController.getBook)
BookRouter .get('/:id', BookController.getBookById)
BookRouter .delete('/:id', BookController.deleteBook)

export default BookRouter;

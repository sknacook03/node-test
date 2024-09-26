import BookService from "../services/book.service.js";
const BookController = {
  createBook: async (req, res) => {
    const { title, author } = req.body;


    if (!title || !author) {
      return res.status(400).json({
        success: false,
        message: "Missing title or author",
      });
    }

    try {

      const books = await BookService.getAll();
      const lastBook = books[books.length - 1];
      let newId = "1";

      if (lastBook) {
        const lastId = lastBook.customId;
        const numberPart = parseInt(lastId, 10);
        const newNumberPart = numberPart + 1;
        newId = newNumberPart.toString();
      }

      // สร้างหนังสือใหม่
      const create = await BookService.create({ customId: newId, title, author });
      res.status(201).json({
        success: true,
        data: create,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  },

  getBook: async (req, res) => {
    const books = await BookService.getAll();
    res.status(200).json({
      success: true,
      data: books,
    });
  },
  getBookById: async (req, res) => {
    const { id } = req.params;
    const books = await BookService.getOneByID(id);
    res.status(200).json({
      success: true,
      data: books,
    });
  },
  updateBook: async (req, res) => {
    const { id } = req.params;
    const { title, author } = req.body;
    const updated = await BookService.updateOneById(id, { title, author });
    res.status(200).json({
      success: true,
      data: updated,
    });
  },
  deleteBook: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await BookService.deleteOneById(id);
      if (result.deletedCount === 0) {
        return res
          .status(404)
          .json({ success: false, message: "Book not found" });
      }
      res
        .status(200)
        .json({ success: true, message: "Book deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  },
};

export default BookController;

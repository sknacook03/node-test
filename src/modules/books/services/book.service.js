import BookModel from "../model/book.schema.js";

const BookService = {
  create: async (payload) => {   
    return new BookModel(payload).save();
  },

  getAll: (query = {}) => {
    return BookModel.find(query);
  },

  getOneByID: (id) => {
    return BookModel.findOne({ customId: id }); 
  },

  updateOneById: (id, payload) => {
    return BookModel.findOneAndUpdate({ customId: id }, { $set: payload }, { new: true }); 
  },

  deleteOneById: (id) => {
    return BookModel.deleteOne({ customId: id }); 
  },
};

export default BookService;

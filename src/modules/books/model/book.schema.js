import mongoose from "../../../common/database/mongoose.db.js";
const { Schema, model } = mongoose;

const BookSchema = new Schema(
  {
    customId: {
      type: Number,
      unique: true, 
      required: true, 
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      default: "NaN",
    },
  },
  { timestamps: true }
);

const BookModel = model("Books", BookSchema);
export default BookModel;

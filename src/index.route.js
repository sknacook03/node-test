import express from "express";
import BookRouter from "./modules/books/book.route.js";
// import UserRouter from "./modules/user/user.route.js"
const IndexRouter = express();

IndexRouter.use("/book", BookRouter);
// IndexRouter.use("/user", UserRouter);
export default IndexRouter;

import express from "express";
import IndexConfig from "./src/index.config.js";
import IndexRouter from "./src/index.route.js";
import IndexMiddleware from "./src/index.middleware.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
const app = express();
app.use(IndexConfig);
app.use(IndexMiddleware);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(IndexRouter);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const frontendPath = join(__dirname, "frontend");
app.use(express.static(frontendPath));
app.get("/", (req, res) => {
  res.sendFile(join(frontendPath, "index.html"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port [${PORT}]`);
});

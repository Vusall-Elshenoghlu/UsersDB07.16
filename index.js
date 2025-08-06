import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { userRoute } from "./router/UserRouter.js";
import mongoose from "mongoose";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/users", userRoute);


// __dirname düzəlişi ESM modul üçün
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// db.json-un tam yolu
const dbPath = path.join(__dirname, "db.json");

// /api/products endpointi
app.get("/api/products", (req, res) => {
  try {
    const fileContent = fs.readFileSync(dbPath, "utf-8");
    const data = JSON.parse(fileContent);
    res.json(data.products || []);
  } catch (err) {
    console.error("Error reading products:", err);
    res.status(500).json({ error: "Failed to read products" });
  }
});

// /api/news-and-blog endpointi
app.get("/api/news-and-blog", (req, res) => {
  try {
    const fileContent = fs.readFileSync(dbPath, "utf-8");
    const data = JSON.parse(fileContent);
    res.json(data.newsAndBlog || []);
  } catch (err) {
    console.error("Error reading news and blog:", err);
    res.status(500).json({ error: "Failed to read news and blog" });
  }
});

const PORT = 3478;

mongoose.connect("mongodb+srv://vusalehaf206:vusal206206@learn.ravyg.mongodb.net/yourDatabaseNameHere", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Connected to MongoDB...");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error("MongoDB connection error:", err);
});

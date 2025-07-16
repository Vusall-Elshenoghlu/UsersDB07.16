import express from "express";
import cors from "cors";
import mongoose from "mongoose";  // mongoose importu unutma
import { userRoute } from "./router/UserRouter.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/users", userRoute);

console.log("hello world");

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

import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { connectDB } from "./database/database.js";

connectDB();
const app = express();
import userRoutes from "./routes/userRoutes.js";

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("uploads"));
app.set("view engine", "ejs");

app.use("", userRoutes);
app.listen(process.env.PORT || 5000, (err) => {
  if (err) throw err;
  console.log(`server is running on --- ${process.env.PORT}`);
});

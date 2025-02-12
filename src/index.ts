import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { dbConnect } from "./db/db";
import { Book } from "./models/bookModel";
import { Author } from "./models/authorModel";
import { Category } from "./models/categoryModel";

dotenv.config();

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 8088;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Home:");
});

Book.sync();
Author.sync();
Category.sync({force: true});

app.listen(PORT, () => {
  console.log(`Server running on port is ${PORT}`);
  dbConnect();
});
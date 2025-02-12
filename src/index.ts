import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { dbConnect } from "./db/db";

dotenv.config();

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 8088;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Home:");
});

app.listen(PORT, () => {
  console.log(`Server running on port is ${PORT}`);
  dbConnect();
});
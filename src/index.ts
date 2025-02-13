import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";


// import { Book } from "./models/bookModel";
// import { Author } from "./models/authorModel";
// import { Category } from "./models/categoryModel";

import { dbConnect, sequelize} from "./db/db";

dotenv.config();

const app: Application = express();
const PORT: number = Number(process.env.PORT) || 8088;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Home:");
});

// Book.sync();
// Author.sync();
// Category.sync();

(async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("Error synchronizing the database:", error);
  }
})();

app.listen(PORT, async () => {
  try {
    console.log(`Server running on port is ${PORT}`);
    await dbConnect();
  } catch (error) {
    console.error("Error starting server:", error);
  }
});
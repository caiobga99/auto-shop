import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { appRoutes } from "./routes";

dotenv.config();
const app: express.Application = express();
const PORT: number = parseInt(process.env.SERVER_PORT as string, 10) || 8080;

app.use(cors());
app.use(express.json());
app.use(appRoutes);


try {
  app.listen(PORT, () => {
    console.log(`HTTP Server running on http://localhost:${PORT}`);
  });
} catch (error) {
  console.error(`Error occurred: ${error}`);
}

import express from "express";
import cors from "cors";
import { errorHandler } from "./middleware";

import api from "./routes";

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", api);
app.use(errorHandler);

const PORT = process.env.port || 3001;
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));

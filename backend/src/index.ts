import express, { Request, Response } from "express";
const cors = require("cors");
const bodyParser = require("body-parser");

const api = require("./routes");
import { HttpException } from "./util";

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", api);

app.use((error: HttpException, req: Request, res: Response, next: any) => {
  if (!error.status) {
    error.status = 500;
  }
  res.status(error.status).json({ error: error.message });
});

const PORT = process.env.port || 3001;
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));

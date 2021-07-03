const cors = require("cors");
import express from "express";
const api = require("./routes");

const app = express();

app.use(cors());

app.use("/api", api);

const PORT = process.env.port || 3001;
app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));

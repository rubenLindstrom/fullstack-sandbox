import express from "express";
const model = require("./model");

const router = express.Router();

router.get("", (req, res) => {
  res.json(model.get());
});

module.exports = router;

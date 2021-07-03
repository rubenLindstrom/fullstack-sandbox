import express from "express";
import Joi from "joi";
import { HttpException } from "./util";
const model = require("./model");

const router = express.Router();

router.get("/", (req, res) => {
  res.json(model.get());
});

const postSchema = Joi.object({
  name: Joi.string().min(1).required(),
});

router.post("/", (req, res, next) => {
  const { value, error } = postSchema.validate(req.body, {
    stripUnknown: true,
  });

  if (error) {
    next(new HttpException(400, error.message));
  }

  const todoList = model.add(value.name);
  res.status(201).json(todoList);
});

module.exports = router;

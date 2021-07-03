import express from "express";
import Joi from "joi";
import model from "./model";
import { validate } from "./middleware";
import { HttpException, NotFoundError } from "./error";

const router = express.Router();

router.get("/", (req, res) => {
  res.json(model.get());
});

const schema = Joi.object({
  name: Joi.string().min(1).required(),
});

router.post("/", validate(schema), (req, res) => {
  const todoList = model.addList(req.body.name);
  res.status(201).json(todoList);
});

router.post("/:listId/item", (req, res, next) => {
  const listId = req.params.listId;

  if (!listId) {
    return next(new NotFoundError());
  }

  try {
    const todoItem = model.addItem(listId, req.body.name);
    res.status(201).json(todoItem);
  } catch (err) {
    next(err);
  }
});

router.patch("/:listId/:itemId", (req, res, next) => {
  const { listId, itemId } = req.params;

  if (!listId || !itemId) {
    return next(new HttpException(400, "Invalid IDs supplied"));
  }

  try {
    model.updateItem(listId, itemId, req.body);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

router.delete("/:listId/:itemId", (req, res, next) => {
  const { listId, itemId } = req.params;

  if (!listId || !itemId) {
    return next(new HttpException(400, "Invalid IDs supplied"));
  }

  try {
    model.deleteItem(listId, itemId);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

export default router;

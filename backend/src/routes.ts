import express from "express";
import Joi from "joi";
import model from "./model";
import { validate } from "./middleware";
import { InvalidIdsError } from "./error";

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

const listSchema = Joi.object({
  name: Joi.string().min(1),
  todos: Joi.array().items(
    Joi.object({
      _id: Joi.string().required(),
      name: Joi.string().min(1).required(),
    })
  ),
});
router.patch("/:listId", validate(listSchema), (req, res, next) => {
  const listId = req.params.listId;

  if (!listId) {
    return next(new InvalidIdsError());
  }

  model.updateList(listId, req.body).catch((err) => next(err));
});

router.post("/:listId/item", (req, res, next) => {
  const listId = req.params.listId;

  if (!listId) {
    return next(new InvalidIdsError());
  }

  model
    .addItem(listId)
    .then((todoItem) => {
      res.status(201).json(todoItem);
    })
    .catch((err) => next(err));
});

router.patch("/:listId/:itemId", validate(schema), (req, res, next) => {
  const { listId, itemId } = req.params;

  if (!listId || !itemId) {
    return next(new InvalidIdsError());
  }

  model
    .updateItem(listId, itemId, req.body)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => next(err));
});

router.delete("/:listId/:itemId", (req, res, next) => {
  const { listId, itemId } = req.params;

  if (!listId || !itemId) {
    return next(new InvalidIdsError());
  }

  model
    .deleteItem(listId, itemId)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => next(err));
});

export default router;

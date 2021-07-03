import { v4 as uuidv4 } from "uuid";
import { NotFoundError } from "./error";

const DB: { [key: string]: TodoList } = {};

class Model {
  get(): TodoList[] {
    return Object.values(DB);
  }

  addList(name: string): TodoList {
    const list = {
      _id: uuidv4(),
      name,
      todos: [],
    };
    DB[list._id] = list;
    return list;
  }

  addItem(listId: string, name: string): TodoItem {
    const list = DB[listId];

    if (!list) {
      throw new NotFoundError();
    }

    const todoItem = {
      _id: uuidv4(),
      name,
    };
    DB[listId] = {
      ...list,
      todos: [...list.todos, todoItem],
    };
    return todoItem;
  }

  updateItem(listId: string, itemId: string, newItem: Partial<TodoItem>) {
    const list = DB[listId];
    const item = list?.todos.find((item) => item._id === itemId);

    if (!item) {
      throw new NotFoundError();
    }

    DB[listId] = {
      ...list,
      todos: list.todos.map((item) =>
        item._id === itemId ? { ...item, ...newItem } : item
      ),
    };
  }
}

const model = new Model();

export default model;

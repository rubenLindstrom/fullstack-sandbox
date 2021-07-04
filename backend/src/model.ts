import { v4 as uuidv4 } from "uuid";
import { NotFoundError } from "./error";
const DB: TodoCollection = {
  "56f23724-652e-45b6-8061-20a93144fd16": {
    _id: "56f23724-652e-45b6-8061-20a93144fd16",
    name: "First List",
    todos: [
      {
        _id: "a8e63f73-a0e9-40df-8364-0d04f447cb4e",
        name: "First todo of first list!",
        completed: true,
      },
    ],
  },
  "816306d6-a688-4b19-8d0d-3d31c35cc982": {
    _id: "816306d6-a688-4b19-8d0d-3d31c35cc982",
    name: "Second List",
    todos: [
      {
        id: "f3450373-3c44-49a9-acfd-c56443e2163b",
        name: "First todo of second list!",
        completed: false,
      },
    ],
  },
};

class Model {
  private async getList(listId: string): Promise<TodoList> {
    const list = DB[listId];

    if (!list) {
      throw new NotFoundError();
    }

    return list;
  }

  private async getListAndItem(
    listId: string,
    itemId: string
  ): Promise<[TodoList, TodoItem]> {
    const list = await this.getList(listId);

    const item = list?.todos.find((item) => item._id === itemId);

    if (!item) {
      throw new NotFoundError();
    }

    return [list, item];
  }

  async get(): Promise<TodoCollection> {
    return DB;
  }

  async addList(name: string): Promise<TodoList> {
    const list = {
      _id: uuidv4(),
      name,
      todos: [],
    };
    DB[list._id] = list;
    return list;
  }

  async updateList(
    listId: string,
    newList: Partial<Omit<TodoList, "_id">>
  ): Promise<TodoList> {
    const list = await this.getList(listId);

    DB[listId] = {
      ...list,
      ...newList,
    };

    return DB[listId];
  }

  async addItem(listId: string): Promise<TodoItem> {
    const list = await this.getList(listId);

    const todoItem = {
      _id: uuidv4(),
      name: "",
    };
    DB[listId] = {
      ...list,
      todos: [...list.todos, todoItem],
    };
    return todoItem;
  }

  async updateItem(
    listId: string,
    itemId: string,
    newItem: Partial<Omit<TodoItem, "_id">>
  ) {
    const [list] = await this.getListAndItem(listId, itemId);

    DB[listId] = {
      ...list,
      todos: list.todos.map((item) =>
        item._id === itemId ? { ...item, ...newItem } : item
      ),
    };
  }

  async deleteItem(listId: string, itemId: string) {
    const [list] = await this.getListAndItem(listId, itemId);

    DB[listId] = {
      ...list,
      todos: list.todos.filter((todo) => todo._id !== itemId),
    };
  }
}

const model = new Model();

export default model;

import { v4 as uuidv4 } from "uuid";
import { NotFoundError } from "./error";

const DB: { [key: string]: TodoList } = {};

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

  async get(): Promise<TodoList[]> {
    return Object.values(DB);
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

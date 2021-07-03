const { v4: uuidv4 } = require("uuid");

const DB: Array<TodoList> = [];

class Model {
  get() {
    return DB;
  }

  add(name: string) {
    const todoList = {
      _id: uuidv4(),
      name,
      todos: [],
    };
    DB.push(todoList);
    return todoList;
  }
}

const model = new Model();

module.exports = model;

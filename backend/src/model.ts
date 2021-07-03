const DB: TodoList[] = [];

class Model {
  get() {
    return DB;
  }
}

const model = new Model();

module.exports = model;

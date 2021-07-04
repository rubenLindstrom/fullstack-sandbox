type TodoItem = {
  _id: string;
  name: string;
};

type TodoList = {
  _id: string;
  name: string;
  todos: Todo[];
};

type TodoCollection = {
  [key: string]: TodoList;
};

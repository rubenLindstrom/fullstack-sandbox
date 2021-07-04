type TodoItem = {
  _id: string;
  name: string;
  completed: boolean;
};

type TodoList = {
  _id: string;
  name: string;
  todos: Todo[];
};

type TodoCollection = {
  [key: string]: TodoList;
};

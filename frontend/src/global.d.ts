type TodoItem = {
  _id: string;
  name: string;
  completed: boolean;
};

type TodoList = {
  _id: string;
  name: string;
  todos: TodoItem[];
};

type TodoCollection = {
  [key: string]: TodoList;
};

import axios from "axios";
import { v4 as uuidv4 } from "uuid";

axios.defaults.baseURL = "http://localhost:3001/api";

const getTodos = (): Promise<TodoCollection> =>
  axios.get("/").then((res) => res.data);

const updateList = (listId: string, list: Partial<TodoList>) =>
  axios.patch(`/${listId}`, {
    ...list,
  });

export default {
  getTodos,
  updateList,
};

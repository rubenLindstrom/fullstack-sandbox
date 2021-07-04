import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const getTodos = (): Promise<TodoCollection> =>
  sleep(1000).then(() =>
    Promise.resolve({
      "0000000001": {
        _id: "0000000001",
        name: "First List",
        todos: [
          {
            _id: "000000003",
            name: "First todo of first list!",
          },
        ],
      },
      "0000000002": {
        _id: "0000000002",
        name: "Second List",
        todos: [
          {
            id: "00000004",
            name: "First todo of second list!",
          },
        ],
      },
    })
  );

export default {
  getTodos,
};

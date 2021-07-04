import React, { Fragment, useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ReceiptIcon from "@material-ui/icons/Receipt";
import Typography from "@material-ui/core/Typography";
import { ToDoListForm } from "./ToDoListForm";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const getPersonalTodos = (): Promise<TodoCollection> => {
  return sleep(1000).then(() =>
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
};

export const ToDoLists: React.FC<{ style: any }> = ({ style }) => {
  const [toDoLists, setToDoLists] = useState<TodoCollection>({});
  const [activeList, setActiveList] = useState<keyof TodoCollection>("");

  useEffect(() => {
    getPersonalTodos().then(setToDoLists);
  }, []);

  const saveTodoList = (id: string, list: TodoList) => {
    const listToUpdate = toDoLists[id];
    setToDoLists({
      ...toDoLists,
      [id]: { ...listToUpdate, todos: [...list.todos] },
    });
  };

  if (!Object.keys(toDoLists).length) return null;
  return (
    <Fragment>
      <Card style={style}>
        <CardContent>
          <Typography component="h2">My ToDo Lists</Typography>
          <List>
            {Object.keys(toDoLists).map((key) => (
              <ListItem key={key} button onClick={() => setActiveList(key)}>
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary={toDoLists[key].name} />
              </ListItem>
            ))}
          </List>
        </CardContent>
      </Card>
      {toDoLists[activeList] && (
        <ToDoListForm
          key={activeList} // use key to make React recreate component to reset internal state
          toDoList={toDoLists[activeList]}
          saveToDoList={saveTodoList}
        />
      )}
    </Fragment>
  );
};

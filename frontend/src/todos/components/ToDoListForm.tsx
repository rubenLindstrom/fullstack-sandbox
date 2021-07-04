import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Checkbox,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import AddIcon from "@material-ui/icons/Add";
import { v4 as uuidv4 } from "uuid";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: "1rem",
  },
  completedMarker: {
    textTransform: "uppercase",
    color: "darkgreen",
    fontWeight: "bold",
  },
  todoLine: {
    display: "flex",
    alignItems: "flex-end",
  },
  textField: {
    flexGrow: 1,
  },
  standardSpace: {
    margin: "8px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  checkbox: {
    width: 16,
    height: 16,
    color: theme.palette.primary.main,
    "&:checked": {
      color: theme.palette.primary.main,
    },
  },
}));

type Props = {
  toDoList: TodoList;
  saveToDoList: Function;
};

export const ToDoListForm: React.FC<Props> = ({ toDoList, saveToDoList }) => {
  const classes = useStyles();
  const [todos, setTodos] = useState<TodoItem[]>(toDoList.todos);

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveToDoList(toDoList._id, todos);
  };

  const toggleItemCompletion = (itemId: string, completed: boolean) => {
    setTodos((prevTodos) =>
      prevTodos.map((item) =>
        item._id === itemId
          ? {
              ...item,
              completed,
            }
          : item
      )
    );
  };

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography component="h2">
          {toDoList.name}
          {toDoList.todos.every((item) => item.completed) && (
            <span className={classes.completedMarker}> - Completed</span>
          )}
        </Typography>
        <form onSubmit={handleSubmit} className={classes.form}>
          {todos.map((item, index) => (
            <div key={item._id} className={classes.todoLine}>
              <div>
                <Checkbox
                  onChange={(e) =>
                    toggleItemCompletion(item._id, e.target.checked)
                  }
                  checked={item.completed}
                  icon={<CheckCircleOutlineIcon />}
                  checkedIcon={<CheckCircleIcon />}
                  className={classes.checkbox}
                  color="default"
                />
              </div>
              <TextField
                label="What to do?"
                value={item.name}
                onChange={(event) => {
                  setTodos([
                    // immutable update
                    ...todos.slice(0, index),
                    {
                      ...todos[index],
                      name: event.target.value,
                    },
                    ...todos.slice(index + 1),
                  ]);
                }}
                className={classes.textField}
              />
              <Button
                size="small"
                color="secondary"
                className={classes.standardSpace}
                onClick={() => {
                  setTodos([
                    // immutable delete
                    ...todos.slice(0, index),
                    ...todos.slice(index + 1),
                  ]);
                }}
              >
                <DeleteIcon />
              </Button>
            </div>
          ))}
          <CardActions>
            <Button
              type="button"
              color="primary"
              onClick={() => {
                setTodos([
                  ...todos,
                  {
                    _id: uuidv4(),
                    name: "",
                    completed: false,
                  },
                ]);
              }}
            >
              Add Todo <AddIcon />
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  );
};

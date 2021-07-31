import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { v4 as uuidv4 } from 'uuid';
import TodoItem from './ToDoItem';

const useStyles = makeStyles(() => ({
  card: {
    margin: '1rem',
  },
  completedMarker: {
    textTransform: 'uppercase',
    color: 'darkgreen',
    fontWeight: 'bold',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  },
}));

type Props = {
  toDoList: TodoList;
  saveToDoList: Function;
};

// TODO: Can we type the args of the cb?
const debounce = <T,>(cb: Function, delay: number) => {
  let timeout: NodeJS.Timeout | null;
  return (...args: any) => {
    const later = () => {
      timeout = null;
      cb.apply(null, args);
    };
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, delay);
  };
};

// TODO: Don't trigger the side effect on initial render, since todo hasn't changed
export const ToDoListForm: React.FC<Props> = ({ toDoList, saveToDoList }) => {
  const classes = useStyles();
  const [todos, setTodos] = React.useState<TodoItem[]>(toDoList.todos);

  const debouncedSave = React.useCallback(debounce(saveToDoList, 500), []);

  React.useEffect(() => {
    debouncedSave(toDoList._id, todos);
  }, [todos]);

  const handleItemTextChange =
    (itemId: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const name = event.target.value;
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo._id === itemId
            ? {
                ...todo,
                name,
              }
            : todo
        )
      );
    };

  const handleItemToggleCompletion =
    (itemId: string) => (event: React.ChangeEvent<HTMLInputElement>) =>
      setTodos((prevTodos) =>
        prevTodos.map((item) =>
          item._id === itemId
            ? {
                ...item,
                completed: event.target.checked,
              }
            : item
        )
      );

  const handleDueDateChange = (itemId: string) => (date: Date | null) =>
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo._id === itemId ? { ...todo, dueDate: date } : todo
      )
    );

  const handleItemDelete = (itemId: string) => () =>
    setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== itemId));

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography component="h2">
          {toDoList.name}
          {toDoList.todos.every((item) => item.completed) && (
            <span className={classes.completedMarker}> - Completed</span>
          )}
        </Typography>
        <form className={classes.form}>
          {todos.map((item) => (
            <TodoItem
              key={item._id}
              item={item}
              onToggleCompletion={handleItemToggleCompletion(item._id)}
              onTextChange={handleItemTextChange(item._id)}
              onDueDateChange={handleDueDateChange(item._id)}
              onDelete={handleItemDelete(item._id)}
            />
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
                    name: '',
                    completed: false,
                    dueDate: null,
                  },
                ]);
              }}
            >
              Add Todo <AddIcon />
            </Button>
          </CardActions>
        </form>
      </CardContent>
    </Card>
  );
};

import React, { Fragment } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ReceiptIcon from '@material-ui/icons/Receipt';
import Typography from '@material-ui/core/Typography';
import { ToDoListForm } from './ToDoListForm';
import TodoContext from '../../context';

export const ToDoLists: React.FC<{ style: any }> = ({ style }) => {
  const { todoLists, activeListId, loading, saveTodoList, setActiveList } =
    React.useContext(TodoContext);

  const sortByCompleted = (listA: TodoList, listB: TodoList) => {
    const aCompleted = listA.todos.every((item) => item.completed);
    const bCompleted = listB.todos.every((item) => item.completed);

    if (bCompleted) return aCompleted ? 0 : -1;
    else return aCompleted ? 1 : 0;
  };

  if (loading || !Object.keys(todoLists).length) return null;
  return (
    <Fragment>
      <Card style={style}>
        <CardContent>
          <Typography component="h2">My ToDo Lists</Typography>
          <List>
            {Object.values(todoLists)
              .slice()
              .sort(sortByCompleted)
              .map((list) => {
                const listCompleted = list.todos.every(
                  (item) => item.completed
                );
                return (
                  <ListItem
                    key={list._id}
                    button
                    onClick={() => setActiveList(list._id)}
                  >
                    <ListItemIcon>
                      <ReceiptIcon
                        {...(listCompleted
                          ? { style: { color: 'green' } }
                          : {})}
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={list.name}
                      {...(listCompleted
                        ? { style: { textDecoration: 'line-through' } }
                        : {})}
                    />
                  </ListItem>
                );
              })}
          </List>
        </CardContent>
      </Card>
      {todoLists[activeListId] && (
        <ToDoListForm
          key={activeListId} // use key to make React recreate component to reset internal state
          toDoList={todoLists[activeListId]}
          saveToDoList={saveTodoList}
        />
      )}
    </Fragment>
  );
};

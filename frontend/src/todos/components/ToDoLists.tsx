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
import TodoContext from "../../context";

export const ToDoLists: React.FC<{ style: any }> = ({ style }) => {
  const { todoLists, activeListId, loading, saveTodoList, setActiveList } =
    React.useContext(TodoContext);

  if (loading || !Object.keys(todoLists).length) return null;
  return (
    <Fragment>
      <Card style={style}>
        <CardContent>
          <Typography component="h2">My ToDo Lists</Typography>
          <List>
            {Object.keys(todoLists).map((listId) => (
              <ListItem
                key={listId}
                button
                onClick={() => setActiveList(listId)}
              >
                <ListItemIcon>
                  <ReceiptIcon />
                </ListItemIcon>
                <ListItemText primary={todoLists[listId].name} />
              </ListItem>
            ))}
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

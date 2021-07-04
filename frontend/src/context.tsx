import React from "react";

type State = {
  todoLists: TodoCollection | null;
  selectedListId: keyof TodoCollection;
};

const initialState = {
  todoLists: null,
  selectedListId: "",
};

const TodoContext = React.createContext<State | { dispatch: Function }>(
  initialState
);

enum ActionTypes {
  ADD_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM,
  SELECT_LIST,
}

type Action =
  | {
      type: ActionTypes.ADD_ITEM;
    }
  | {
      type: ActionTypes.UPDATE_ITEM;
      payload: {
        newItem: Partial<TodoItem>;
      };
    }
  | {
      type: ActionTypes.DELETE_ITEM;
      payload: {
        itemId: string;
      };
    }
  | {
      type: ActionTypes.SELECT_LIST;
      payload: {
        listId: string;
      };
    };

const reducer = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.ADD_ITEM:
      return state;
    case ActionTypes.DELETE_ITEM:
      return state;
    case ActionTypes.DELETE_ITEM:
      return state;
    case ActionTypes.SELECT_LIST:
      return state;
    default:
      return state;
  }
};

export const TodoContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <TodoContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContext;

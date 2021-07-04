import React from "react";
import api from "./api";

type State = {
  todoLists: TodoCollection;
  activeListId: keyof TodoCollection;
  loading: Boolean;
};

type Handlers = {
  saveTodoList: (listId: string, items: TodoItem[]) => void;
  setActiveList: (listId: string) => void;
};

enum ActionTypes {
  SET_TODOS = "SET_TODOS",
  SAVE_LIST = "SAVE_LIST",
  SELECT_LIST = "SELECT_LIST",
}

type Action =
  | {
      type: ActionTypes.SET_TODOS;
      payload: {
        collection: TodoCollection;
      };
    }
  | {
      type: ActionTypes.SAVE_LIST;
      payload: {
        listId: string;
        items: TodoItem[];
      };
    }
  | {
      type: ActionTypes.SELECT_LIST;
      payload: {
        listId: string;
      };
    };

const initialState: State = {
  todoLists: {},
  activeListId: "",
  loading: true,
};

const initialHandlers = {
  saveTodoList: (id: string, items: TodoItem[]) => {},
  setActiveList: (listId: string) => {},
};

const TodoContext = React.createContext<State & Handlers>({
  ...initialState,
  ...initialHandlers,
});

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case ActionTypes.SET_TODOS:
      return {
        ...state,
        todoLists: action.payload.collection,
        loading: false,
      };
    case ActionTypes.SAVE_LIST:
      return {
        ...state,
        todoLists: {
          ...state.todoLists,
          [action.payload.listId]: {
            ...state.todoLists[action.payload.listId],
            todos: action.payload.items,
          },
        },
      };
    case ActionTypes.SELECT_LIST:
      return {
        ...state,
        activeListId: action.payload.listId,
      };
    default:
      return state;
  }
};

export const TodoContextProvider: React.FC = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  React.useEffect(() => {
    api.getTodos().then((collection) => {
      dispatch({
        type: ActionTypes.SET_TODOS,
        payload: {
          collection,
        },
      });
    });
  }, []);

  const saveTodoList = (listId: string, items: TodoItem[]) => {
    api.updateList(listId, { todos: items });
    dispatch({
      type: ActionTypes.SAVE_LIST,
      payload: {
        listId,
        items,
      },
    });
  };

  const setActiveList = (listId: string) =>
    dispatch({
      type: ActionTypes.SELECT_LIST,
      payload: {
        listId,
      },
    });

  return (
    <TodoContext.Provider value={{ ...state, saveTodoList, setActiveList }}>
      {children}
    </TodoContext.Provider>
  );
};

export default TodoContext;

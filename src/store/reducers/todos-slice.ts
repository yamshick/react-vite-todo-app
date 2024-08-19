import { createSlice } from "@reduxjs/toolkit";
import { localStorageStateManager } from "../../local-storage/local-storage";

export interface ITodoItem {
    id: Date,
    text: string,
    status: string
}

const initialState = {
  todos: [],
};

export const todosSlice = createSlice({
  name: "todos",
  //@ts-ignore   
  initialState: localStorageStateManager.value.todosReducer || initialState,
  reducers: {
    setTodos(state, action) {
      state.todos = action.payload;
    },
    addTodo(state, action) {
        state.todos = [action.payload, ...state.todos]
    },
    deleteTodo(state, action) {
        state.todos = state.todos.filter((todo: ITodoItem) => todo.id !== action.payload)
    },
    updateTodoStatus(state, action) {
        const {id, status} = action.payload

        state.todos = state.todos.map((todo: ITodoItem) => todo.id === id ? {...todo, status} : todo)
    }
  },
});

export const { reducer } = todosSlice;
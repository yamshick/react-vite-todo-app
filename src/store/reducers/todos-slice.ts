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
        state.todos = [...state.todos, action.payload]
    },
    deleteTodo(state, action) {
        state.todos = state.todos.filter((todo: ITodoItem) => todo.id !== action.payload)
    },
    updateTodoStatus(state, action) {
        const newTodo = action.payload
        const prevTodo = state.todos.find((todo: ITodoItem) => todo.id === newTodo.id)
        if (prevTodo) {
            prevTodo.status = newTodo.status
        }
    }
  },
});

export const { reducer } = todosSlice;
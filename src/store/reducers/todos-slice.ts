import { createSlice } from "@reduxjs/toolkit";
import { localStorageStateManager } from "../../local-storage/local-storage";

const initialState = {
  todos: [],
};

export const todosSlice = createSlice({
  name: "todos",
  initialState: localStorageStateManager.value.todosReducer || initialState,
  reducers: {
    setTodos(state, action) {
      state.todos = action.payload;
    },
    addTodo(state, action) {
        state.todos = [...state.todos, action.payload]
    },
    deleteTodo(state, action) {
        state.todos = state.todos.filter(todo => todo.id !== action.payload)
    },
    updateTodoStatus(state, action) {
        const newTodo = action.payload
        const prevTodo = state.todos.find(todo => todo.id === newTodo.id)
        if (prevTodo) {
            prevTodo.status = newTodo.status
        }
    }
  },
});

export const { reducer } = todosSlice;
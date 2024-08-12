import { createDraftSafeSelector } from "@reduxjs/toolkit";

const selectSelf = (state: any) => state.todosReducer

export const selectTodos = createDraftSafeSelector(
    selectSelf,
    ({todos}) => todos
)
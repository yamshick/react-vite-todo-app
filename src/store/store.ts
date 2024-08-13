import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { reducer as todosReducer } from "./reducers/todos-slice";
import { reducer as filtersReducer } from "./reducers/filter-slice";
import { LOCAL_STORAGE_STATE_KEY } from "../local-storage/local-storage";

const rootReducer = combineReducers({
  todosReducer,
  filtersReducer
});
// @ts-ignore
const localStorageMiddleware = (store) => (next) => (action) => {
  console.log(action);
  const result = next(action);
  localStorage.setItem(
    LOCAL_STORAGE_STATE_KEY,
    JSON.stringify(store.getState())
  );
  return result;
};
export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(localStorageMiddleware),
  });
};
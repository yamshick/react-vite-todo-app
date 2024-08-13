import { createSlice } from "@reduxjs/toolkit";
import { localStorageStateManager } from "../../local-storage/local-storage";
import { FILTERS } from "../../constants";

const initialState = {
  filter: FILTERS.ALL,
};

export const filtersSlice = createSlice({
  name: "filters",
  //@ts-ignore   
  initialState: localStorageStateManager.value.filtersReducer || initialState,
  reducers: {
    setFilter(state, action) {
      state.filter = action.payload;
    },
  },
});

export const { reducer } = filtersSlice;
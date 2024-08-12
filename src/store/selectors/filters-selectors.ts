import { createDraftSafeSelector } from "@reduxjs/toolkit";

export const selectSelf = state => state.filtersReducer

export const selectFilter = createDraftSafeSelector(
    selectSelf,
    ({filter}) => filter
)
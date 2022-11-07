import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { TypedUseSelectorHook, useDispatch } from "react-redux";


import formEmployeeSlice from "./formEmployee.store";
import listEmployeesSlice from "./listEmployees.store";

const store = configureStore({
  reducer: {
    formEmployeeSlice: formEmployeeSlice.reducer,
    listEmployeeSlice: listEmployeesSlice.reducer
  }
})

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>

export type ReducerFormEmployee = typeof formEmployeeSlice.reducer;
export type StateFormEmployee = ReturnType<ReducerFormEmployee>;
export type ReducerListEmployees = typeof formEmployeeSlice.reducer;
export type StateListEmployees = ReturnType<ReducerListEmployees>;

export default store;
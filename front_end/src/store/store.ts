import { configureStore } from "@reduxjs/toolkit";

import  aouthReducer from "./reducers/aouthReducer";
import TaskReducer from './reducers/taskReducer';
import categoryreduser from './reducers/categoryReducer';

const store = configureStore({
  reducer: {
    taskKey: TaskReducer,
    CategoryKey: categoryreduser,
    aouthKey:aouthReducer
  },
});
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
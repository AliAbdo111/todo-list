import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import listReducer from './reducers/listReducer';
import TaskReducer from './reducers/TaskREducer';
import categoryreduser from './reducers/categoryreduser';
import notificationReducer from './reducers/notificationReducer';
import { configureStore } from "@reduxjs/toolkit";



const store = configureStore({ 
  reducer: {
    taskKey: TaskReducer,
    CategoryKey:categoryreduser
  },
});
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


// const rootReducer = combineReducers({
//   list: listReducer,
//   notification: notificationReducer,
//   taskREducer:TaskREducer
// });
// const store = createStore(rootReducer, composeWithDevTools());

// export type RootState = ReturnType<typeof rootReducer>;

export default store;
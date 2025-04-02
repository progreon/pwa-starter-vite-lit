import { combineReducers } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import { getLocalforageConfig, getLocalStorageConfig, getSessionStorageConfig } from './storage'
import { counterSlice } from './actions/counter'
import { routerSlice } from './actions/router'
import { todosSlice } from './actions/todos'

export const rootReducer = combineReducers({
  counter: persistReducer(getLocalStorageConfig(counterSlice.name), counterSlice.reducer),
  // router: persistReducer(getSessionStorageConfig(routerSlice.name), routerSlice.reducer),
  router: routerSlice.reducer,
  todos: persistReducer(getLocalforageConfig(todosSlice.name), todosSlice.reducer),
});

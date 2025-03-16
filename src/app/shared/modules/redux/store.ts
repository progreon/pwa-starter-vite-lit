import { combineReducers, configureStore } from '@reduxjs/toolkit';
import routerReducer from './routerSlice';
import todosReducer from './todoSlice';
import counterReducer from './counterSlice';
import { localStorageMiddleware, loadStateFromLocalStorage } from './localStorageMiddleware.js';

export const rootReducer = combineReducers({
  counter: counterReducer,
  todos: todosReducer,
  router: routerReducer, // Ensure this exists
});

const preloadedState = loadStateFromLocalStorage();

export const store = configureStore({
  reducer: rootReducer,
  preloadedState,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(localStorageMiddleware)
});

export type PwaStore = typeof store;
export type PwaState = ReturnType<typeof store.getState>
export type PwaDispatch = typeof store.dispatch
// export type PwaThunk<ThunkReturnType = void> = ThunkAction<
//   ThunkReturnType,
//   PwaState,
//   unknown,
//   Action
// >

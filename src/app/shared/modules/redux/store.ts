import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { routerReducer, routerSlice } from './routerSlice';
import { todosReducer, todosSlice } from './todoSlice';
import { counterReducer, counterSlice } from './counterSlice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import defaultStorage from 'redux-persist/lib/storage';
import sStorage from 'redux-persist/lib/storage/session';
import localforage from 'localforage';

// using redux-persist...
const keyPrefix = 'vite-pwa:';
localforage.config({
  name: 'vite-pwa'
});

const defaultPersistConfig = {
  keyPrefix,
  key: 'default',
  storage: defaultStorage,
}
const statePersistConfig = {
  keyPrefix,
  key: 'state',
  storage: defaultStorage,
}
const counterPersistConfig = {
  keyPrefix,
  key: counterSlice.name,
  storage: defaultStorage,
}
const routerPersistConfig = {
  keyPrefix,
  key: routerSlice.name,
  storage: sStorage,
};
const todosPersistConfig = {
  keyPrefix,
  key: todosSlice.name,
  storage: localforage,
};
// const rootPersistConfig = {
//   keyPrefix,
//   key: 'root',
//   storage: defaultStorage,
//   blacklist: [todosSlice.name, routerSlice.name, counterSlice.name]
//   // blacklist: [todosSlice.name, routerSlice.name]
//   // blacklist: [todosSlice.name]
// }
export const rootReducer = combineReducers({
  // counter: counterReducer,
  // todos: todosReducer,
  // router: routerReducer,
  // state: persistReducer(statePersistConfig, combineReducers({
  //   counter: counterReducer,
  //   todos: todosReducer,
  // })),
  counter: persistReducer(counterPersistConfig, counterReducer),
  router: persistReducer(routerPersistConfig, routerReducer),
  todos: persistReducer(todosPersistConfig, todosReducer),
});

// const persistedReducer = persistReducer(defaultPersistConfig, rootReducer);
// const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
  // reducer: persistedReducer,
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store);

export type PwaStore = typeof store;
export type PwaState = ReturnType<typeof store.getState>
export type PwaDispatch = typeof store.dispatch
// export type PwaThunk<ThunkReturnType = void> = ThunkAction<
//   ThunkReturnType,
//   PwaState,
//   unknown,
//   Action
// >

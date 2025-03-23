import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { rootReducer } from './reducers';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store);

export type AppStore = typeof store;
export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
// export type AppThunk<ThunkReturnType = void> = ThunkAction<
//   ThunkReturnType,
//   AppState,
//   unknown,
//   Action
// >

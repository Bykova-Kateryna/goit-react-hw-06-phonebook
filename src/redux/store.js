import { configureStore } from '@reduxjs/toolkit';
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
import storage from 'redux-persist/lib/storage';
import { phoneBookReducer } from './slice';

const persistConfig = {
  key: 'phonebook',
  storage,
  whitelist: ['contacts'],
};

const persistPhonebookReducer = persistReducer(persistConfig, phoneBookReducer);

export const store = configureStore({
  reducer: persistPhonebookReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './userSlice';

// Config for redux-persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user','isLoggedIn','probtopics'], // Only persist the user slice
};

const persistedReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'persist/PERSIST',
          'persist/REHYDRATE',
          'persist/REGISTER',
        ], // Ignore redux-persist actions
      },
    }),
});

export const persistor = persistStore(store);
export default store;

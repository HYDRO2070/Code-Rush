// components/ClientProvider.js
"use client";

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from '@/redux/store';

export default function ClientProvider({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={<div className='w-full h-full flex justify-center items-center text-purple-500 text-[20px]'>Loading...</div>} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}

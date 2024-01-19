// import { Cypress } from 'cypress';
import { configureStore } from '@reduxjs/toolkit';
import { RootReducer } from './reducers';

export const getStore = () => configureStore({
  reducer: RootReducer,
});

declare global {
  interface Window {
    // Cypress: Cypress;
    store: ReturnType<typeof getStore>;
  }
}

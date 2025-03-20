// import { PwaStore, PwaState } from './store';
import { Middleware } from "@reduxjs/toolkit";
import * as localforage from "localforage";
console.log('import localforage from "localforage";', localforage)
// import { PwaState } from "./store";

export const localStorageMiddleware: Middleware = store => next => async action => {
  const result = next(action); // Forward action to reducers
  const state = store.getState(); // Get updated state

  // Save only the required part of the state (avoid saving entire store)
  // localStorage.setItem('reduxState', JSON.stringify(state));
  // await localforage.setItem('reduxState', JSON.stringify(state));
  await localforage.setItem('reduxState', state);

  return result;
};

// Function to load initial state from localStorage
export const loadStateFromLocalStorage = async () => {
  try {
    // const savedState = localStorage.getItem('reduxState');
    const savedState = await localforage.getItem<any>('reduxState');
    // if (savedState) {
    //   return JSON.parse(savedState);
    // }
    return savedState;
  } catch (error) {
    console.error("Failed to load state from localStorage:", error);
  }
  return undefined; // Return undefined if no saved state exists
};

import { authReducer, InitialState } from "@/features/auth/slices/auth.slice";
import { configureStore } from "@reduxjs/toolkit";

export type PreloadedState = {
  authReducer: InitialState;
};

export function createStore(preloadedState: PreloadedState) {
  const store = configureStore({
    reducer: {
      authReducer,
    },
    preloadedState,
  });

  return store;
}

export type appStore = ReturnType<typeof createStore>;
export type appState = ReturnType<appStore["getState"]>;

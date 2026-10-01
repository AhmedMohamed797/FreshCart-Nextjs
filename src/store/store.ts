import { authReducer, InitialState } from "@/features/auth/slices/auth.slice";
import { cartReducer, CartValuesType } from "@/features/cart/slices/cart.slice";
import { configureStore } from "@reduxjs/toolkit";

export type PreloadedState = {
  authReducer: InitialState;
  cartReducer: CartValuesType;
};

export function createStore(preloadedState: PreloadedState) {
  const store = configureStore({
    reducer: {
      authReducer,
      cartReducer,
    },
    preloadedState,
  });

  return store;
}

export type appStore = ReturnType<typeof createStore>;
export type appState = ReturnType<appStore["getState"]>;

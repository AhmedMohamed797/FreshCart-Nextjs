import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartApiResponse, CartItem } from "../types/cart.types";

export type CartValuesType = {
  status: string;
  message: string;
  numOfCartItems: number;
  cartId: string;
  data: {
    products: CartItem[];
    totalCartPrice: number;
  };
};

const cartInitialValues: CartValuesType = {
  status: "",
  message: "",
  numOfCartItems: 0,
  cartId: "",
  data: {
    products: [],
    totalCartPrice: 0,
  },
};

const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitialValues,
  reducers: {
    setCartInfo: (state, action: PayloadAction<CartApiResponse>) => {
      if (action.payload.status === "success") {
        state.status = action.payload.status;
        state.message = action.payload.message;
        state.cartId = action.payload.cartId;
        state.numOfCartItems = action.payload.numOfCartItems;
        state.data = action.payload.data;
      }
    },
  },
});

export const cartReducer = cartSlice.reducer;
export const cartActions = cartSlice.actions;

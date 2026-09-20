import { createSlice } from "@reduxjs/toolkit";

type UserInfo = {
  id?: string;
  name: string;
  email?: string;
  role: string;
};

export type InitialState = {
  isAuthenticated: boolean;
  userInfo: UserInfo | null;
};

const initialState: InitialState = {
  isAuthenticated: false,
  userInfo: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthStates: function (state, action) {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.userInfo = action.payload.userInfo;
    },

    logOut: function (state) {
      state.isAuthenticated = false;
      state.userInfo = null;
    },
  },
});

export const authReducer = authSlice.reducer;
export const authActions = authSlice.actions;

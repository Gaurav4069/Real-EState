import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }
  }
});

export const { signInFailure, signInSuccess, signInStart } = userSlice.actions;

//The createSlice function automatically generates action creators for the reducers.
//These action creators are functions that, when called, return an action object (with type and optional payload) for the corresponding reducer.
//signInStart() creates an action with type: 'user/signInStart'.

export default userSlice.reducer;

// we have to use redux persist because after sign in if the user refresh the page then  all the credentials are lost  so to store them in a local storage so that the data is not lost after the refresh we have to use redux persist
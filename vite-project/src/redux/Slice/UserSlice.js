import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    id: null,
    firstName: null,
    lastName: null,
    imageURL: null,
  },
  reducers: {
    addUser: (state, action) => {
      state.id = action.payload.id;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.imageURL = action.payload.imageURL;
    },
    removeUser: (state) => {
      state.id = null;
      state.firstName = null;
      state.lastName = null;
      state.imageURL = null;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;

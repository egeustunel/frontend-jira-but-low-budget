import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  users: [],
}
const usersSlice = createSlice({
  name: "users",
  initialState: initialState,
  reducers: {
    setUsers: (state, action) => {
      const { users } = action.payload;
      state.users = users;
    },
  },
});

export default usersSlice;

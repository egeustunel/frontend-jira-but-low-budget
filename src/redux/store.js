import { configureStore } from "@reduxjs/toolkit";
import columnsSlice from "./columnsSlice";
import usersSlice from "./usersSlice";


const store = configureStore({
  reducer: {
    columns: columnsSlice.reducer,
    users: usersSlice.reducer,
  }
})

export default store

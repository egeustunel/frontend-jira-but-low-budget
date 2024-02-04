import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Kanban from "./components/Kanban.jsx";
import { Provider } from "react-redux";
import store from "./redux/store";
import ProtectedRoutes from "./utils/ProtectedRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/kanban",
        element: <Kanban />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

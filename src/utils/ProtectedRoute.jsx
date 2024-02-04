import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
	const localStorageToken = localStorage.getItem("user");

	return localStorageToken ? <Outlet /> : <Navigate to="/login"/>;
};

export default ProtectedRoutes;
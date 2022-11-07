import React from "react";
import { Navigate, Outlet } from "react-router-dom";

// Закрывает роуты signuз и signin если пользователь авторизован
const CloseRoutes = ({ loggedIn }) => {
  return !loggedIn ? <Outlet /> : <Navigate to="/" />;
};

export default CloseRoutes;
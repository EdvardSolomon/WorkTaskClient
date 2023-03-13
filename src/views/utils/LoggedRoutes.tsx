import { Outlet, Navigate } from "react-router-dom";
const LoggedRoutes = () => {
  return !localStorage.getItem("token") ? <Outlet /> : <Navigate to="/" />;
};

export default LoggedRoutes;

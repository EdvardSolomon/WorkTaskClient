import { Outlet, Navigate } from "react-router-dom";
import { useUserStore } from "../../data/stores/useUserStore";

const LoggedRoutes = () => {
  const loggedIn = useUserStore((state: any) => state.loggedIn);

  return loggedIn === false ? <Outlet /> : <Navigate to="/" />;
};

export default LoggedRoutes;

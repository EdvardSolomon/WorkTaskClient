import { Outlet, Navigate } from "react-router-dom";
import { useUserStore } from "../../data/stores/useUserStore";

const PrivateRoutes = () => {
  const loggedIn = useUserStore((state: any) => state.loggedIn);

  return loggedIn === true ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./views/pages/homePage/HomePage";
import { useEffect } from "react";
import { useUserStore } from "./data/stores/useUserStore";
import { Route, Routes, useNavigate, useResolvedPath } from "react-router-dom";
import { Container } from "react-bootstrap";
import NavDashboard from "./views/components/navigation/navbar/Navbar";
import FolderComponent from "./views/pages/folderPage/FolderComponent";
import { ToastContainer } from "react-toastify";
import PermissionRoute from "./views/components/protectedRoutes/PermissionRoute";
import AviableToMePage from "./views/pages/aviableToMePage/AviableToMePage";

function App() {
  const history = useNavigate();
  const url = useResolvedPath("").pathname;
  const [isAuth, checkAuth, userData] = useUserStore((state: any) => [
    state.isAuth,
    state.checkAuth,
    state.userData,
  ]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      checkAuth();
    }
    if (!localStorage.getItem("token")) {
      history("/login");
    }
  }, []);

  return (
    <Container fluid className="px-0" style={{ overflowX: "hidden" }}>
      <ToastContainer />
      <NavDashboard
        name={userData?.firstName + " " + userData?.lastName}
        isLoggedIn={isAuth}
      />
      <Routes>
        <Route path={`${url}`} element={<HomePage />} />
        <Route element={<PermissionRoute />}>
          <Route path={`${url}/folder/:folderId`} element={<FolderComponent />} />
        </Route>
        <Route path={`${url}/shared-with-me`} element={<AviableToMePage/>}/>
      </Routes>
    </Container>
  );
}
export default App;
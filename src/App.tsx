import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HomePage from "./views/pages/homePage/HomePage";
import { useEffect } from "react";
import { useUserStore } from "./data/stores/useUserStore";
import { Route, Routes, useNavigate, useResolvedPath } from "react-router-dom";
import { Container } from "react-bootstrap";
import FileComponent from "./views/components/fileComponent/FileComponent";
import NavDashboard from "./views/components/navbar/Navbar";
import FolderComponent from "./views/components/folderComponent/FolderComponent";

function App() {
  const history = useNavigate();
  const url = useResolvedPath("").pathname;
  const [isAuth, checkAuth, isLoading, setLoading, userData] = useUserStore(
    (state: any) => [
      state.isAuth,
      state.checkAuth,
      state.isLoading,
      state.setLoading,
      state.userData,
    ]
  );

  useEffect(() => {
    if (localStorage.getItem("token")) {
      checkAuth();
    }
    if (!localStorage.getItem("token")) {
      history("/login");
    }
    setLoading(false);
  }, []);

  if (isLoading == true) {
    return <div>LOADING</div>;
  }

  return (
    <Container fluid className="px-0" style={{ overflowX: "hidden" }}>
      <NavDashboard
        name={userData?.firstName + " " + userData?.lastName}
        isLoggedIn={isAuth}
      />
      <Routes>
        <Route element={<LoggedRoutes />}>
          <Route path={`${url}`} element={<HomePage />} />
          <Route
            path={`${url}/folder/:folderId`}
            element={<FolderComponent />}
          />
          <Route path={`${url}/file/:fileId`} element={<FileComponent />} />
        </Route>
      </Routes>
    </Container>
  );
}

export default App;

import { Container } from "react-bootstrap";
import { Route, Routes, useResolvedPath } from "react-router-dom";
import FileComponent from "../../components/fileComponent/FileComponent";
import FolderComponent from "../../components/folderComponent/FolderComponent";
import NavDashboard from "../../components/navbar/Navbar";
import HomePage from "../homePage/HomePage";

const Dashboard = () => {
  const url = useResolvedPath("").pathname;
  return (
    <Container fluid className="px-0" style={{ overflowX: "hidden" }}>
      <NavDashboard
        name={userData?.firstName + " " + userData?.lastName}
        isLoggedIn={isAuth}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path={`${url}/folder/:folderId`} element={<FolderComponent />} />
        <Route path={`${url}/file/:fileId`} element={<FileComponent />} />
      </Routes>
    </Container>
  );
};

export default Dashboard;

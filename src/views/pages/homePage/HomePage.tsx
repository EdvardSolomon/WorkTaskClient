import {
  faFileAlt,
  faFileAudio,
  faFileImage,
  faFileVideo,
  faFolder,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Row, Col } from "react-bootstrap";
import { useUserStore } from "../../../data/stores/useUserStore";
import NavDashboard from "../../components/navbar/Navbar";
import SubNav from "../../components/subNav/SubNav";
import { redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = () => {
  
  const [
    userData,
    isAuth,
    userFiles,
    userFolders,
  ]: any = useUserStore((state) => [
    state.userData,
    state.isAuth,
    state.userFiles,
    state.userFolders,
  ]);

  const [rootFolder] = userFolders.filter(
    (folder: any) => folder.folderName == "Root"
  );

  const rootFolderChilds = userFolders.filter(
    (folder: any) => folder.parentId == rootFolder.id
  );

  const rootFolderFiles = userFiles.filter(
    (file: any) => file.folderId == rootFolder.id
  );

  return (
    <Container fluid className="px-0" style={{ overflowX: "hidden" }}>
      <NavDashboard
        name={userData?.firstName + " " + userData?.lastName}
        isLoggedIn={isAuth}
      />
      <SubNav currentFolder={rootFolder} />
      {rootFolderChilds && rootFolderChilds.length > 0 && (
        <>
          <p className="text-center border-bottom py-2">Folders</p>
          <Row style={{ height: "auto" }} className="pt-2 gap-2 pb-4 px-5">
            {rootFolderChilds.map(
              ({ folderName, id }: { folderName: string; id: string }) => (
                <Col
                  onDoubleClick={() => redirect(`/dashboard/folder/${id}`)}
                  onClick={(e) => {
                    if (e.currentTarget.classList.contains("text-white")) {
                      e.currentTarget.style.background = "#fff";
                      e.currentTarget.classList.remove("text-white");
                      e.currentTarget.classList.remove("shadow-sm");
                    } else {
                      e.currentTarget.style.background = "#017bf562";
                      e.currentTarget.classList.add("text-white");
                      e.currentTarget.classList.add("shadow-sm");
                    }
                  }}
                  key={id}
                  md={2}
                  className="border h-100 d-flex align-items-center justify-content-around flex-column py-1 rounded-2"
                >
                  <FontAwesomeIcon
                    icon={faFolder}
                    className="mt-3"
                    style={{ fontSize: "3rem" }}
                  />
                  <p className="text-center mt-3">{folderName}</p>
                </Col>
              )
            )}
          </Row>
        </>
      )}
      {rootFolderFiles && rootFolderFiles.length > 0 && (
        <>
          <p className="text-center border-bottom py-2">Files</p>
          <Row
            md="2"
            style={{ height: "auto" }}
            className="pt-2  gap-2 pb-4 px-5"
          >
            {rootFolderFiles.map(({ originalName, id }) => (
              <Col
                onDoubleClick={() => redirect(`/dashboard/file/${id}`)}
                onClick={(e) => {
                  if (e.currentTarget.classList.contains("text-white")) {
                    e.currentTarget.style.background = "#fff";
                    e.currentTarget.classList.remove("text-white");
                    e.currentTarget.classList.remove("shadow-sm");
                  } else {
                    e.currentTarget.style.background = "#017bf562";
                    e.currentTarget.classList.add("text-white");
                    e.currentTarget.classList.add("shadow-sm");
                  }
                }}
                key={id}
                md={2}
                className="border h-100 mr-2 d-flex align-items-center justify-content-around flex-column py-1 rounded-2"
              >
                <FontAwesomeIcon
                  icon={
                    originalName
                      .split(".")
                      [originalName.split(".").length - 1].includes("png") ||
                    originalName
                      .split(".")
                      [originalName.split(".").length - 1].includes("jpg") ||
                    originalName
                      .split(".")
                      [originalName.split(".").length - 1].includes("jpeg") ||
                    originalName
                      .split(".")
                      [originalName.split(".").length - 1].includes("svg") ||
                    originalName
                      .split(".")
                      [originalName.split(".").length - 1].includes("gif")
                      ? faFileImage
                      : originalName
                          .split(".")
                          [originalName.split(".").length - 1].includes(
                            "mp4"
                          ) ||
                        originalName
                          .split(".")
                          [originalName.split(".").length - 1].includes("mpeg")
                      ? faFileVideo
                      : originalName
                          .split(".")
                          [originalName.split(".").length - 1].includes("mp3")
                      ? faFileAudio
                      : faFileAlt
                  }
                  className="mt-3"
                  style={{ fontSize: "3rem" }}
                />
                <p className="text-center mt-3">{originalName}</p>
              </Col>
            ))}
          </Row>
        </>
      )}
      <ToastContainer />
    </Container>
  );
};

export default HomePage;

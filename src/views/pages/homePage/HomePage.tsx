import {
  faFileAlt,
  faFileAudio,
  faFileImage,
  faFileVideo,
  faFolder,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Row, Col } from "react-bootstrap";
import { useUserStore } from "../../../data/stores/useUserStore";
import SubNav from "../../components/navigation/subNav/SubNav";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { FolderData } from "../../../data/models/state/FolderData";
import { FileData } from "../../../data/models/state/FileData";
import EditFolder from "../../components/modals/editFolder/EditFolder";
import FileModal from "../../components/modals/fileModal/FileModal";
const HomePage = () => {
  const history = useNavigate();
  const [isLoading, userFiles, userFolders, deleteFolder] = useUserStore(
    (state: any) => [
      state.isLoading,
      state.userFiles,
      state.userFolders,
      state.deleteFolder,
    ]
  );

  if (isLoading) {
    return (
      <>
        <Row>
          <Col md="12">
            <p className="text-center small text-center my-5">LOADING...</p>
          </Col>
        </Row>
      </>
    );
  }

  const deleteFunk = async (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    folderId: number
  ) => {
    e.stopPropagation();
    const result = confirm("Хотите удалить папку?");
    if (result) {
      await deleteFolder(folderId);
    }
  };

  const [rootFolder] = userFolders.filter(
    (folder: FolderData) => folder.folderName == "Root"
  );

  const rootFolderChilds = userFolders.filter(
    (folder: FolderData) => folder.parentId == rootFolder?.id
  );

  const rootFolderFiles = userFiles.filter(
    (file: FileData) => file.folderId == rootFolder?.id
  );

  return (
    <Container fluid className="px-0" style={{ overflowX: "hidden" }}>
      <SubNav currentFolder={rootFolder} />
      {rootFolderChilds && rootFolderChilds.length > 0 ? (
        <>
          <p className="text-center border-bottom py-2">Folders</p>
          <Row style={{ height: "auto" }} className="pt-2 gap-2 pb-4 px-5">
            {rootFolderChilds.map(
              ({ folderName, id }: { folderName: string; id: string }) => (
                <Col
                  onDoubleClick={() => history(`/folder/${id}`)}
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
                  className="border h-100 d-flex align-items-center justify-content-around flex-column py-1 rounded-2 position-relative"
                >
                  <FontAwesomeIcon
                    role="button"
                    onClick={(e) => deleteFunk(e, id)}
                    icon={faTrash}
                    className="position-absolute bottom-100 start-0"
                    style={{ fontSize: "15px" }}
                  />
                  <EditFolder
                    currentFolderId={id}
                    parentFolderId={rootFolder.id}
                  />
                  <FontAwesomeIcon
                    icon={faFolder}
                    className="mt-2"
                    style={{ fontSize: "3rem" }}
                  />
                  <p className="text-center mt-3 cursor-point">{folderName}</p>
                </Col>
              )
            )}
          </Row>
        </>
      ) : (
        <>
          <Row>
            <Col md="12">
              <p className="text-center small text-center my-5">Empty Folder</p>
            </Col>
          </Row>
        </>
      )}
      {rootFolderFiles && rootFolderFiles.length > 0 ? (
        <>
          <p className="text-center border-bottom py-2">Files</p>
          <Row
            md="2"
            style={{ height: "auto" }}
            className="pt-2  gap-2 pb-4 px-5"
          >
            {rootFolderFiles.map(({ originalName, id }) => (
              <Col
                onDoubleClick={() => history(`/dashboard/file/${id}`)}
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
                className="border h-100 mr-2 d-flex align-items-center justify-content-around flex-column py-1 rounded-2 d-flex"
              >
                <FileModal
                  fileId={id}
                  currentFolderId={rootFolder.id}
                  fileName={originalName}
                />
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
      ) : (
        <>FETCHING FILES</>
      )}
    </Container>
  );
};

export default HomePage;

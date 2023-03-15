import {
  faFileAlt,
  faFolder,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "react-bootstrap";
import { redirect, useNavigate, useParams } from "react-router";
import { FileData } from "../../../data/models/state/FileData.js";
import { FolderData } from "../../../data/models/state/FolderData.js";
import { useUserStore } from "../../../data/stores/useUserStore.js";
import EditFolder from "../../components/modals/editFolder/EditFolder.js";
import FileModal from "../../components/modals/fileModal/FileModal.js";
import SubNav from "../../components/navigation/subNav/SubNav";

const FolderComponent = () => {
  const deleteFolder = useUserStore((state) => state.deleteFolder);

  const { folderId } = useParams();

  const folderIdToNumber = Number(folderId);

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

  const history = useNavigate();

  const [folders, files]: any = useUserStore((state) => [
    state.userFolders,
    state.userFiles,
  ]);

  const userFolders =
    folders &&
    folders.filter((folder: FolderData) => folder.parentId == folderIdToNumber);

  const currentFolder = folders.find(
    (folder: FolderData) => folder.id == folderIdToNumber
  );

  const createdFiles =
    files &&
    files.filter((file: FileData) => file.folderId == folderIdToNumber);

  const uploadedFiles =
    files &&
    files.filter((file: FileData) => file.folderId == folderIdToNumber);

  if (
    userFolders &&
    userFolders.length < 1 &&
    createdFiles &&
    createdFiles.length < 1 &&
    uploadedFiles &&
    uploadedFiles.length < 1
  ) {
    return (
      <>
        <SubNav currentFolder={currentFolder} />
        <Row>
          <Col md="12">
            <p className="text-center small text-center my-5">Empty Folder</p>
          </Col>
        </Row>
      </>
    );
  }
  return (
    <>
      <SubNav currentFolder={currentFolder} />
      {userFolders && userFolders.length > 0 && (
        <>
          <p className="text-center border-bottom py-2">Folders</p>
          <Row
            md="2"
            style={{ height: "auto" }}
            className="pt-2  gap-2 pb-4 px-5"
          >
            {!folders ? (
              <h1 className="text-center">Fetching Files....</h1>
            ) : (
              userFolders.map(({ folderName, id }) => (
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
                  className="border h-100 mr-2 d-flex align-items-center justify-content-around flex-column py-1 rounded-2 position-relative"
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
                    parentFolderId={currentFolder.id}
                  />
                  <FontAwesomeIcon
                    icon={faFolder}
                    className="mt-3"
                    style={{ fontSize: "3rem" }}
                  />
                  <p className="text-center mt-3">{folderName}</p>
                </Col>
              ))
            )}
          </Row>
        </>
      )}
      {createdFiles && createdFiles.length > 0 && (
        <>
          <p className="text-center border-bottom py-2">Files</p>
          <Row
            md="2"
            style={{ height: "auto" }}
            className="pt-2  gap-2 pb-4 px-5"
          >
            {createdFiles.map(({ originalName, id }) => (
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
                <FileModal fileId={id} currentFolderId={currentFolder.id} />
                <FontAwesomeIcon
                  icon={faFileAlt}
                  className="mt-3"
                  style={{ fontSize: "3rem" }}
                />
                <p className="text-center mt-3">{originalName}</p>
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default FolderComponent;

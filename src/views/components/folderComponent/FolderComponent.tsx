import {
  faFile,
  faFileAlt,
  faFileAudio,
  faFileImage,
  faFileVideo,
  faFolder,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { redirect, useParams } from "react-router";
import { useUserStore } from "../../../data/stores/useUserStore.js";
import SubNav from "../subNav/SubNav";

const FolderComponent = () => {
  const { folderId } = useParams();

  const [userId, folders, files]: any = useUserStore((state) => [
    state.userData.id,
    state.userFolders,
    state.userFiles,
  ]);

  // useEffect(() => {
  //   if (!folders && !files) {
  //     //  dispatch(getUserFolders(userId));
  //     //  dispatch(getUserFiles(userId));
  //   }
  // }, [folders, isLoading]);
  const userFolders =
    folders && folders.filter((file) => file.parentId === folderId);

  const currentFolder =
    folders && folders.find((folder) => folder.id === folderId);

  const createdFiles =
    files && files.filter((file) => file.folderId === folderId);

  const uploadedFiles =
    files && files.filter((file) => file.folderId === folderId);

  // if (isLoading) {
  //   return (
  //     <Row>
  //       <Col md="12">
  //         <h1 className="text-center my-5">Fetching data...</h1>
  //       </Col>
  //     </Row>
  //   );
  // }

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
                  className="border h-100 mr-2 d-flex align-items-center justify-content-around flex-column py-1 rounded-2"
                >
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

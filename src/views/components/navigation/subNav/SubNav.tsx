import { Col } from "react-bootstrap";
import CreateFolder from "../../modals/createFolder/CreateFolder";
import UploadFile from "../../modals/uploadFile/UploadFile";
import BreadCrum from "./Breadcrumps";

const SubNav = (folder) => {
  const currentFolder = folder.currentFolder;

  if (!currentFolder) {
    return (
      <>
        <Col
          md="12"
          className={
            "d-flex align-items-center px-5 pt-3 justify-content-between"
          }
        >
          <p>Empty Folder</p>
        </Col>
      </>
    );
  }

  return (
    <Col
      md={12}
      className={"d-flex align-items-center px-5 pt-3 justify-content-between"}
    >
      {currentFolder && currentFolder.folderName !== "Root" ? (
        <BreadCrum currentFolder={currentFolder} />
      ) : (
        <p>Root</p>
      )}
      <div className="ml-auto col-md-5 d-flex justify-content-end">
        <UploadFile currentFolder={currentFolder} />
        &nbsp;
        <CreateFolder currentFolder={currentFolder} />
      </div>
    </Col>
  );
};

export default SubNav;

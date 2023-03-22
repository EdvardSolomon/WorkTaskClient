import { Col } from "react-bootstrap";
import CreateFolder from "../../modals/createFolder/CreateFolder";
import UploadFile from "../../modals/uploadFile/UploadFile";
import BreadCrum from "./Breadcrumps";

const SubNav = ({ currentFolder, role }) => {
  console.log(role);
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

  if (role === "owner") {
    return (
      <Col
        md={12}
        className={
          "d-flex align-items-center px-5 pt-3 justify-content-between"
        }
      >
        {currentFolder && currentFolder.folderName !== "Root" ? (
          <BreadCrum folder={currentFolder} role={role} />
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
  }

  if (role === "writer") {
    return (
      <Col
        md={12}
        className={
          "d-flex align-items-center px-5 pt-3 justify-content-between"
        }
      >
        <BreadCrum folder={currentFolder} role={"writer"} />
        <div className="ml-auto col-md-5 d-flex justify-content-end">
          <UploadFile currentFolder={currentFolder} />
          &nbsp;
          <CreateFolder currentFolder={currentFolder} />
        </div>
      </Col>
    );
  }

  if (role === "reader") {
    return (
      <Col
        md={12}
        className={
          "d-flex align-items-center px-5 pt-3 justify-content-between"
        }
      >
        <BreadCrum folder={currentFolder} role={"reader"} />
      </Col>
    );
  }
};

export default SubNav;

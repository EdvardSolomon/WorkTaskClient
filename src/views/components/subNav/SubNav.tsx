import { useEffect } from "react";
import { Col } from "react-bootstrap";
import { useUserStore } from "../../../data/stores/useUserStore";
import CreateFolder from "../createFolder/CreateFolder";
import UploadFile from "../uploadFile/UploadFile";

const SubNav = (folder) => {
  const currentFolder = folder.currentFolder;

  return (
    <Col
      md={12}
      className={"d-flex align-items-center px-5 pt-3 justify-content-between"}
    >
      {currentFolder && currentFolder.folderName !== "Root" ? (
        <>
          <p>
            <a href="/">Root</a>- {currentFolder.folderName}
          </p>
        </>
      ) : (
        <>
          <p>Root</p>
        </>
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

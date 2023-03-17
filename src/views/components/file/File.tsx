import { faFile } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FileModal from "../modals/fileModal/FileModal";

const File = ({ originalName, id, folderId }) => {
  const history = useNavigate();

  return (
    <Col
      onDoubleClick={() => history(`/file/${id}`)}
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
      md={2}
      className="border h-100 mr-2 d-flex align-items-center flex-column py-1 rounded-2 d-flex"
    >
      <FileModal
        fileId={id}
        currentFolderId={folderId}
        fileName={originalName}
      />
      <FontAwesomeIcon
        icon={faFile}
        className="mt-3"
        style={{ fontSize: "3rem" }}
      />
      <p className="text-center mt-3">{originalName}</p>
    </Col>
  );
};

export default File;

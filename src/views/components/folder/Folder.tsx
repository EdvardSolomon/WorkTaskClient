import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../../data/stores/useUserStore";
import FolderModal from "../modals/folderModal/FolderModal";

const Folder = ({ folderName, id, folderId }) => {
  const history = useNavigate();

  const deleteFolder = useUserStore((state: any) => state.deleteFolder);


  return (
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
      className="border h-100 d-flex align-items-center flex-column py-1 rounded-2 position-relative"
    >
      <FolderModal currentFolderId={id} parentFolderId={folderId} />
      <FontAwesomeIcon
        icon={faFolder}
        className="mt-2"
        style={{ fontSize: "3rem" }}
      />
      <p className="text-center mt-3 cursor-point">{folderName}</p>
    </Col>
  );
};
export default Folder;

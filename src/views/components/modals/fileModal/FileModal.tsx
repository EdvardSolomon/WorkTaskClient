import { faTimes, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import FileService from "../../../../data/services/FileService";
import { useUserStore } from "../../../../data/stores/useUserStore";

const FileModal = ({ currentFolderId, fileId, fileName }) => {
  const [showModal, setShowModal] = useState(false);
  const [folderName, setFolderName] = useState("");

  const [userFiles, updateFile, deleteFile]: any = useUserStore((state) => [
    state.userFiles,
    state.updateFile,
    state.deleteFile,
  ]);

  const deleteFunk = async (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    fileId: number
  ) => {
    e.stopPropagation();
    const result = confirm("Хотите удалить файл?");
    if (result) {
      await deleteFile(fileId);
    }
  };

  const downloadFunk = async (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    fileId: number
  ) => {
    e.stopPropagation();
    const result = await FileService.getFile(fileId);
    const url = window.URL.createObjectURL(new Blob([result.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${fileName}`);
    document.body.appendChild(link);
    link.click();
    setShowModal(false);
  };

  const handleFolderSubmit = (e) => {
    e.preventDefault();
    const view = e.target[1].checked ? "private" : "public";
    const filteredFiles = userFiles.filter(
      (file) =>
        file.folderId === currentFolderId &&
        file.originalName === folderName.trim()
    );
    if (!folderName) return toast.warn("Name can't be empty");
    if (filteredFiles.length > 0)
      return toast.dark("This is alredy present in folder");
    updateFile(folderName, view, fileId);
    setFolderName("");
    setShowModal(false);
    return;
  };
  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header>
          <Modal.Title>Edit File</Modal.Title>
          <Button
            variant="white"
            style={{ cursor: "pointer" }}
            onClick={() => setShowModal(false)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </Button>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFolderSubmit}>
            <Form.Group controlId="formBasicFolderName" className="my-2">
              <Form.Control
                type="text"
                placeholder="Enter new folder name..."
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
              />
              <Form.Check
                className="mt-1"
                type="checkbox"
                label="private"
                onChange={(e) => console.log(e.target.checked)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicFolderSubmit" className="mt-4">
              <Button type="submit" className="form-control" variant="primary">
                Edit File
              </Button>
              <Button
                type="button"
                className="form-control mt-1"
                variant="success"
                onClick={(e) => {
                  downloadFunk(e, fileId);
                }}
              >
                Download File
              </Button>
              <Button
                type="button"
                className="form-control mt-1"
                variant="danger"
                onClick={(e) => {
                  deleteFunk(e, fileId);
                }}
              >
                Delete File
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
      <Button
        onClick={() => setShowModal(true)}
        variant="outline-dark"
        className="border-1 d-flex rounded-2"
      >
        <FontAwesomeIcon icon={faEllipsisVertical} />
      </Button>
    </>
  );
};

export default FileModal;

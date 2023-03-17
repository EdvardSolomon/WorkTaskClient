import { faEllipsisVertical, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { useUserStore } from "../../../../data/stores/useUserStore";

const FolderModal = ({ currentFolderId, parentFolderId }) => {
  const [showModal, setShowModal] = useState(false);
  const [folderName, setFolderName] = useState("");

  const [userFolders, updateFolder]: any = useUserStore((state) => [
    state.userFolders,
    state.updateFolder,
  ]);

  const handleFolderSubmit = (e) => {
    e.preventDefault();
    const view = e.target[1].checked ? "private" : "public";
    const filteredFolders = userFolders.filter(
      (folder) =>
        folder.parentId === parentFolderId &&
        folder.folderName === folderName.trim()
    );
    if (!folderName) return toast.warn("Name can't be empty");
    if (filteredFolders.length > 0)
      return toast.dark("This is alredy present in folder");
    updateFolder(folderName, view, currentFolderId);
    setFolderName("");
    setShowModal(false);
    return;
  };
  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header>
          <Modal.Title>Edit Folder</Modal.Title>
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
                type="checkbox"
                label="private"
                onChange={(e) => console.log(e.target.checked)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicFolderSubmit" className="mt-5">
              <Button type="submit" className="form-control" variant="primary">
                Edit Folder
              </Button>
              <Button
                type="button"
                className="form-control mt-1"
                variant="success"
              >
                Share
              </Button>
              <Button
                type="button"
                className="form-control mt-1"
                variant="danger"
              >
                Delete Folder
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
      <Button
        onClick={() => setShowModal(true)}
        variant="outline-dark"
        className="d-flex align-self-end display-relative position-absolute"
      >
        <FontAwesomeIcon icon={faEllipsisVertical} />
      </Button>
    </>
  );
};

export default FolderModal;

import { faFolderPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { useUserStore } from "../../../data/stores/useUserStore";

const CreateFolder = ({ currentFolder }) => {
  const [showModal, setShowModal] = useState(false);
  const [folderName, setFolderName] = useState("");

  const [
    userId,
    userFolders,
    tokens,
    addFolder,
  ]: any = useUserStore((state) => [
    state.userData.id,
    state.userFolders,
    state.tokens,
    state.addFolder,
  ]);
  const createFolder = async (folderName, userId, parentId) => {
    const response = await axios.post(
      "http://localhost:3000/folders",
      {
        userId: userId,
        folderName: folderName,
        view: "public",
        parentId: parentId,
      },
      {
        headers: {
          Authorization: `Bearer ${tokens.access_token}`,
        },
      }
    );
    addFolder(response.data);
  };

  const handleFolderSubmit = (e) => {
    e.preventDefault();
    const filteredFolders = userFolders.filter(
      (folder) =>
        folder.parentId === currentFolder.id &&
        folder.folderName === folderName.trim()
    );
    console.log(filteredFolders);
    if (!folderName) return toast.warn("Name can't be empty");

    if (filteredFolders.length > 0)
      return toast.dark("This is alredy present in folder");
    createFolder(folderName, userId, currentFolder.id);
    setFolderName("");
    setShowModal(false);
    return;
  };
  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header>
          <Modal.Title>Create Folder</Modal.Title>
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
                placeholder="Enter folder name..."
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formBasicFolderSubmit" className="mt-5">
              <Button type="submit" className="form-control" variant="primary">
                Add Folder
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
      <Button
        onClick={() => setShowModal(true)}
        variant="outline-dark"
        className="border-1 d-flex align-items-center justify-content-between rounded-2"
      >
        <FontAwesomeIcon icon={faFolderPlus} />
        &nbsp; Create Folder
      </Button>
    </>
  );
};

export default CreateFolder;

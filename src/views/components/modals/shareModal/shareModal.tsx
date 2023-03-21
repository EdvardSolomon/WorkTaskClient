import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Button, Col, Container, Form, ListGroup, Modal, Row, Stack } from "react-bootstrap";
import { toast } from "react-toastify";
import { useUserStore } from "../../../../data/stores/useUserStore";
import Select from "../../select/Select";

const ShareModal = ({ currentFolderId, parentFolderId }) => {
  const [showModal, setShowModal] = useState(false);
  const [folderName, setFolderName] = useState("");


  const handleFolderSubmit = (e) => {
    e.preventDefault();
    setFolderName("");
    setShowModal(false);
    return;
  };
  return (
    <>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header>
          <Modal.Title>Permissons</Modal.Title>
          <Button
            variant="white"
            style={{ cursor: "pointer" }}
            onClick={() => setShowModal(false)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </Button>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Stack direction="horizontal" gap={3}>
            <Form.Group controlId="formBasicFolderName" className="my-2 col-md-8">
              <Form.Control
                type="text"
                placeholder="Add user by email..."
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
              />
            </Form.Group>
            <Button type="submit" className="form-control" variant="primary"> Add</Button>
                </Stack>
    <ListGroup className="my-2">
      <ListGroup.Item>
        <Container>
        <Row>
        <Col>Simon Goodman (you)</Col>
        <Col>Owner</Col>
        </Row>
        </Container>
        </ListGroup.Item>
      <ListGroup.Item>
        <Container>
        <Row>
        <Col className="m-auto">Edvard Solomon</Col>
        <Col><Select/></Col>
        </Row>
        </Container>
        </ListGroup.Item>
    </ListGroup>
            <Form.Group controlId="formBasicFolderSubmit" className="mt-3">
              <Button
                type="button"
                className="form-control mt-1"
                variant="success"
              >
                Save Changes
              </Button>
              <Button
                type="button"
                className="form-control mt-1"
                variant="danger"
              >
               Cancel
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
      <Button
        onClick={() => setShowModal(true)}
        type="button"
        className="form-control mt-1"
        variant="success"
      >
        Share
      </Button>
    </>
  );
};

export default ShareModal;

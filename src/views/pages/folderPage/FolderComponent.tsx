import { Col, Container, Row } from "react-bootstrap";
import { useUserStore } from "../../../data/stores/useUserStore.js";
import Files from "../../components/file/Files.js";
import Folders from "../../components/folder/Folders.js";
import SubNav from "../../components/navigation/subNav/SubNav";

const FolderComponent = () => {
  const [isLoading, currentFolder,]: any = useUserStore((state) => [
    state.isLoading,
    state.currentFolder,
  ]);

  if (isLoading) {
    return (
      <>
        <Row>
          <Col md="12">
            <p className="text-center small text-center my-5">LOADING...</p>
          </Col>
        </Row>
      </>
    );
  }
  return (
    <Container fluid className="px-0" style={{ overflowX: "hidden" }}>
      <SubNav currentFolder={currentFolder} role={"owner"}/>
      <Folders rootFolderId={currentFolder?.id} children={currentFolder.children} />
      <Files rootFolder={currentFolder} />
    </Container>
  );
};
export default FolderComponent;
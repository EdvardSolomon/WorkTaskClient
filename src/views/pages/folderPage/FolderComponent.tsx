import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router";
import { FolderData } from "../../../data/models/state/FolderData.js";
import { useUserStore } from "../../../data/stores/useUserStore.js";
import Files from "../../components/file/Files.js";
import Folders from "../../components/folder/Folders.js";
import SubNav from "../../components/navigation/subNav/SubNav";

const FolderComponent = () => {
  const { folderId } = useParams();
  const folderIdToNumber = Number(folderId);

  const [userFolders, isLoading]: any = useUserStore((state) => [
    state.userFolders,
    state.isLoading,
  ]);

  const currentFolder = userFolders.find(
    (folder: FolderData) => folder.id == folderIdToNumber
  );

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
      <SubNav currentFolder={currentFolder} />
      <Folders rootFolder={currentFolder} />
      <Files rootFolder={currentFolder} />
    </Container>
  );
};

export default FolderComponent;

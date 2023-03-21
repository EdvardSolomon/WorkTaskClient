import { Container, Row, Col } from "react-bootstrap";
import { useUserStore } from "../../../data/stores/useUserStore";
import SubNav from "../../components/navigation/subNav/SubNav";
import { FolderData } from "../../../data/models/state/FolderData";
import Files from "../../components/file/Files";
import Folders from "../../components/folder/Folders";
const AviableToMePage = () => {
  const [isLoading, userFolders] = useUserStore((state: any) => [
    state.isLoading,
    state.userFolders,
  ]);

  const [rootFolder] = userFolders.filter(
    (folder: FolderData) => folder.folderName == "Root"
  );

  
  const rootFolderChilds = userFolders.filter(
    (folder: FolderData) => folder.parentId == rootFolder.id
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
      <SubNav currentFolder={rootFolder} role={"writer"}/>
      <Folders rootFolderId={rootFolder?.id} children={rootFolderChilds} />
      <Files rootFolder={rootFolder} />
    </Container>
  );
};

export default AviableToMePage;

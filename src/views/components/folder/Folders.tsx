import { Col, Row } from "react-bootstrap";
import Folder from "./Folder";

const Folders = ({ rootFolderId, children }) => {

  return (
    <>
      {children && children.length > 0 ? (
        <>
          <p className="text-center border-bottom py-2">Folders</p>
          <Row style={{ height: "auto" }} className="pt-2 gap-2 pb-4 px-5">
            {children.map(
              ({ folderName, id }: { folderName: string; id: string }) => (
                <Folder
                  folderName={folderName}
                  id={id}
                  folderId={rootFolderId}
                  key={id}
                />
              )
            )}
          </Row>
        </>
      ) : (
        <>
          <Row>
            <Col md="12">
              <p className="text-center small text-center my-5">Empty Folder</p>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};
export default Folders;
import { Row, Col } from "react-bootstrap";
import File from "./File";

const Files = ({ rootFolderId, children }) => {
  return (
    <>
      {children && children?.length > 0 ? (
        <>
          <p className="text-center border-bottom py-2">Files</p>
          <Row
            md="2"
            style={{ height: "auto" }}
            className="pt-2  gap-2 pb-4 px-5"
          >
            {children.map(({ originalName, id }) => (
              <File
                originalName={originalName}
                id={id}
                folderId={rootFolderId}
                key={id}
              />
            ))}
          </Row>
        </>
      ) : (
        <>
          <Row>
            <Col md="12">
              <p className="text-center small text-center my-5">No Files</p>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default Files;

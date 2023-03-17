import { Row, Col } from "react-bootstrap";
import { FileData } from "../../../data/models/state/FileData";
import { useUserStore } from "../../../data/stores/useUserStore";
import File from "./File";

const Files = ({ rootFolder }) => {
  const userFiles = useUserStore((state: any) => state.userFiles);

  const rootFolderFiles = userFiles.filter(
    (file: FileData) => file.folderId == rootFolder?.id
  );

  return (
    <>
      {rootFolderFiles && rootFolderFiles?.length > 0 ? (
        <>
          <p className="text-center border-bottom py-2">Files</p>
          <Row
            md="2"
            style={{ height: "auto" }}
            className="pt-2  gap-2 pb-4 px-5"
          >
            {rootFolderFiles.map(({ originalName, id }) => (
              <File
                originalName={originalName}
                id={id}
                folderId={rootFolder.id}
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

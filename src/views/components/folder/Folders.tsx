import { Col, Row } from "react-bootstrap";
import { FolderData } from "../../../data/models/state/FolderData";
import { useUserStore } from "../../../data/stores/useUserStore";
import Folder from "./Folder";

const Folders = ({ rootFolder }) => {
  const userFolders = useUserStore((state: any) => state.userFolders);

  const rootFolderChilds = userFolders.filter(
    (folder: FolderData) => folder.parentId == rootFolder?.id
  );

  return (
    <>
      {rootFolderChilds && rootFolderChilds.length > 0 ? (
        <>
          <p className="text-center border-bottom py-2">Folders</p>
          <Row style={{ height: "auto" }} className="pt-2 gap-2 pb-4 px-5">
            {rootFolderChilds.map(
              ({ folderName, id }: { folderName: string; id: string }) => (
                <Folder
                  folderName={folderName}
                  id={id}
                  folderId={rootFolder?.id}
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

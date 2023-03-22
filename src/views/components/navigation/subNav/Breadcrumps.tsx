import { Breadcrumb } from "react-bootstrap";
import { useUserStore } from "../../../../data/stores/useUserStore";

const BreadCrum = ({ folder, role }) => {
  const currentFolder = folder;

  const userFolders = useUserStore((state) => state.userFolders);

  const path = currentFolder?.path?.split("/").slice(1);
  let filteredFolders;
  if (path) {
    filteredFolders = userFolders.filter((folder) => {
      if (path.some((fid) => folder.id == fid)) {
        return folder;
      }
    });
  }

  return (
    <Breadcrumb>
      {path &&
      currentFolder.folderName !== "Root" &&
      filteredFolders?.length > 0 ? (
        <>
          {role == "owner" ? (
            <Breadcrumb.Item href={"/"} className="text-decoration-none">
              Root
            </Breadcrumb.Item>
          ) : (
            <Breadcrumb.Item
              href={"/shared-with-me"}
              className="text-decoration-none"
            >
              Aviable to me
            </Breadcrumb.Item>
          )}

          {filteredFolders.map((folder) => (
            <Breadcrumb.Item key={folder.id} href={`/folder/${folder.id}`}>
              {folder.folderName}
            </Breadcrumb.Item>
          ))}
          <Breadcrumb.Item active>{currentFolder.folderName}</Breadcrumb.Item>
        </>
      ) : (
        <>
          {role == "owner" ? (
            <Breadcrumb.Item
              href={"/"}
              linkProps={{
                variant: "white",
                className: "text-primary",
              }}
            >
              Root
            </Breadcrumb.Item>
          ) : (
            <Breadcrumb.Item
              href={"/shared-with-me"}
              className="text-decoration-none"
            >
              Aviable to me
            </Breadcrumb.Item>
          )}
          <Breadcrumb.Item active>{currentFolder.folderName}</Breadcrumb.Item>
        </>
      )}
    </Breadcrumb>
  );
};

export default BreadCrum;

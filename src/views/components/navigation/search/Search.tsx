import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { FolderData } from "../../../../data/models/state/FolderData";
import { useUserStore } from "../../../../data/stores/useUserStore";

const Search = () => {
  const userFolders = useUserStore((state) => state.userFolders);

  const [searchTerm, setSearchTerm] = useState("");
  const [folderList, setFolderList] = useState(userFolders);

  const filter = (searchText: string, folders: FolderData[]) => {
    console.log(searchText);
    if (!searchText) {
      return folders;
    }

    return folders.filter((folder) => {
      folder.folderName.toLowerCase().includes(searchText.toLowerCase());
    });
  };

  useEffect(() => {
    const Debounce = setTimeout(() => {
      const filteredFolders = filter(searchTerm, userFolders);
      setFolderList(filteredFolders);
      console.log(folderList);
    }, 300);

    return () => clearTimeout(Debounce);
  }, [searchTerm]);

  return (
    <Form style={{ marginLeft: "auto", marginRight: "auto", width: "300px" }}>
      <Form.Group controlId="search">
        <Form.Control
          type="search"
          placeholder="Search"
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
      </Form.Group>
    </Form>
  );
};

export default Search;

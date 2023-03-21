import $api from "../http";

// add models and types
export default class FolderService {
  static getFoldersByUser(userId: number) {
    return $api.get(`/folders/user/${userId}`);
  }

  static createFolder(
    folderName: string,
    userId: number,
    parentId: number,
    path: string
  ) {
    return $api.post(`/folders`, {
      userId: userId,
      folderName: folderName,
      view: "public",
      path: path,
      parentId: parentId,
    });
  }

  static deleteFolder(folderId: number) {
    return $api.delete(`/folders/${folderId}`);
  }

  static updateFolder(folderName: string, view: string, folderId: number) {
    return $api.patch(`/folders/${folderId}`, {
      folderName: folderName,
      view: view,
    });
  }

  static getFolderById(folderId: number) {
    return $api.get(`/folders/${folderId}`);
  }
};

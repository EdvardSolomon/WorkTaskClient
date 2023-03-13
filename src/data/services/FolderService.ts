import $api from "../http";

// add models and types
export default class FolderService {
    static getFoldersByUser(userId: any) {
        return $api.get(`/folders/user/${userId}`);
    }

    static createFolder(folderName: string, userId: number, parentId: number) {
        return $api.post(`/folders`,
        {
            userId: userId,
            folderName: folderName,
            view: "public",
            parentId: parentId,
          });
    }
}
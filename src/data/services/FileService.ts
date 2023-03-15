import $api from "../http";

// add models and types
export default class FileService {
  static getFilesByUser(userId: any) {
    return $api.get(`/file/user/${userId}`);
  }

  static async createFile(folderId: number, file: any) {
    const data = new FormData();
    data.append("file", file);
    return await $api.post(`/file/upload/${folderId}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
  static deleteFile(fileId: number) {
    return $api.delete(`/file/${fileId}`);
  }

  static updateFile(originalName: string, view: string, fileId: number) {
    return $api.patch(`/file/${fileId}`, {
      originalName: originalName,
      view: view,
    });
  }

  static async getFile(fileId: number) {
    return $api.get(`/file/${fileId}`, {
      responseType: "blob",
    });
  }
}

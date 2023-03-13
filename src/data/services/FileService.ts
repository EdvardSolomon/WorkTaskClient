import $api from "../http";

// add models and types
export default class FileService {
    static getFoldersByUser(userId: any) {
        return $api.get(`/file/user/${userId}`);
    }
}
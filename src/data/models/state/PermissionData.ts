import { UserData } from "./UserData";

export interface PermissionData {
    id: number;
    folderId: number;
    userId: number;
    role: 'reader' | 'writer';
    user?: UserData;
  }
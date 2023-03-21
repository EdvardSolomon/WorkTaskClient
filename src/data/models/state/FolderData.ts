import { UserData } from "./UserData";

export interface FolderData {
  id: number;
  createdAt: string;
  updatedAt: string;
  folderName: string;
  path: string;
  view: string;
  userId: number;
  parentId: number;
  user?: UserData;
  userPermission: { role: string};
}

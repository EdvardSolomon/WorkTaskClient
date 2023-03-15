import { UserData } from "../state/UserData";

export interface GoogleLoginResponse {
  token: string;
  user: UserData;
}

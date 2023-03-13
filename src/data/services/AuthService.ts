import { AxiosResponse } from "axios";
import $api from "../http";
import { GoogleLoginResponse } from "../models/response/GoogleLoginResponse";

export default class AuthService {
  static async googleLogin(): Promise<AxiosResponse<GoogleLoginResponse>> {
    return $api.post("/auth/google/login", {
      token: localStorage.getItem("token"),
    });
  }

  static async logout() {
    console.log("TESTING");
    return $api.post("auth/logout");
  }
}

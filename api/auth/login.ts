import { LoginInfo } from "../../services/auth/session";
import { API, request } from "../api";

export class Login {
  private email: string;
  private password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  async Do(): Promise<LoginInfo> {
    return request().post(API.Login, {
      email: this.email,
      password: this.password
    }).then(res => {
      console.info(res.status);
      console.info(res.data);
      return res.data as LoginInfo;
    });
  }
}
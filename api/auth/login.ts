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
    // 接口失败
    // 接口错误
    return request().post(API.Login, {
      email: this.email,
      password: this.password
    })
    // .then(res => {
    //   return JSON.parse(res.data) as LoginInfo
    // });
  }
}
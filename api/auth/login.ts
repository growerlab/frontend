import { AxiosResponse } from "axios";
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
    return request().post<Login, AxiosResponse<LoginInfo>>(API.Login, {
      email: this.email,
      password: this.password
    }).then(res => {
      return res.data as LoginInfo;
    }).catch(err => {
      console.error(err);
      throw err;
    });
  }
}
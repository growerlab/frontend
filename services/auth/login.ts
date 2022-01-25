import { Login } from "../../api/auth/login"
import { Message } from "../../api/common/notice";
import { LoginInfo, SessionService } from "./session";

export class LoginService {
  constructor() {
    return
  }

  static async login(email: string, password: string): Promise<void | LoginInfo> {
    const login = new Login(email, password);
    return login.Do()
      .then(res => {
        const info = res.data;
        SessionService.storeLogin(info);
        return info;
      })
      .catch(err => {
        Message.Error(err.message);
      });
  }
}

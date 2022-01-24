import { Login } from "../../api/auth/login"
import { Message } from "../../api/common/notice";
import { LoginInfo, SessionService } from "./session";

export class LoginService {
  constructor() {
    return
  }

  static login(email: string, password: string): Promise<void | LoginInfo> {
    const login = new Login(email, password);
    return login.Do().then(res => {
      const session = new SessionService();
      session.storeLogin(res);
      return res;
    }).catch(err => {
      console.error(err)
      Message.Error(err)
    })
  }
}

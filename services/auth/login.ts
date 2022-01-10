import { Login } from "../../api/auth/login"

export class LoginService {
  constructor() {
    return
  }

  static login(email: string, password: string): void {
    const login = new Login(email, password)
    login.Do().then(res => {
      console.log(res)
    }).catch(err => {
      console.error(err)
    })
  }
}

import http from "../shared/http-common";
import { LoginModel, RegisterModel } from "./Auth.const";

class AuthService {
    login(data: LoginModel) {
        return http.post("/auth/login", data);
    }

    register(data: RegisterModel) {
        return http.post("/auth/register", data);
    }
}

export default new AuthService();

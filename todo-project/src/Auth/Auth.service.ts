import http from "../shared/http-common";
import { LoginModel, RegisterModel } from "./Auth.const";

class AuthService {
    login(data: LoginModel) {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }
        return http.post("/auth/login", data, config);
    }

    register(data: RegisterModel) {
        return http.post("/auth/register", data);
    }
}

export default new AuthService();

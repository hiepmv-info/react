import { AxiosResponse } from "axios";
import FormShare from "../shared/FormShare";
import { AuthResponse, LoginModel, loginBlockColumn } from "./Auth.const";
import AuthService from "./Auth.service";
import { useNavigate } from "react-router-dom";
import setCookie from "../shared/setCookies";

function Login() {
    const login = loginBlockColumn;
    const navigate = useNavigate();

    const onSubmit = (data: LoginModel) => {
        AuthService.login(data).then((response: AxiosResponse<AuthResponse>) => {
            setCookie('token', response.data.accessToken, response.data.expiresIn);
            setCookie('refreshToken', response.data.refreshToken, response.data.expiresIn);
            setCookie('user', response.data.user, response.data.expiresIn);
            navigate("/");
        }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <FormShare column={login} onSubmit={onSubmit} />
    )
}

export default Login;
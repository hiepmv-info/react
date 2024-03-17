import { AxiosResponse } from "axios";
import FormShare from "../shared/FormShare";
import { AuthResponse, LoginModel, loginBlockColumn } from "./Auth.const";
import AuthService from "./Auth.service";
import { useNavigate } from "react-router-dom";
import setCookie from "../shared/setCookies";

function Login() {
    console.log('Login');
    const login = loginBlockColumn;
    const navigate = useNavigate();

    const onSubmit = (data: LoginModel) => {
        AuthService.login(data).then((response: AxiosResponse<AuthResponse>) => {
            setCookie('token', response.data.accessToken);
            setCookie('user', response.data.user);
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
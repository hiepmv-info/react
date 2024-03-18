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
        const formData = new FormData();
        formData.append('email', data.username);
        formData.append('password', data.password);
        AuthService.login(data).then((response: AxiosResponse<AuthResponse>) => {
            setCookie('token', response.data['access_token'], 3);
            setCookie('user', response.data.user, 3);
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
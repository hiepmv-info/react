import { useNavigate } from "react-router-dom";
import FormShare from "../shared/FormShare";
import { RegisterModel, registerBlockColumn } from "./Auth.const";
import AuthService from "./Auth.service";

function Register() {
    console.log('Register');
    const register = registerBlockColumn;
    const navigate = useNavigate();

    const onSubmit = (data: RegisterModel) => {
        AuthService.register(data).then(() => {
            console.log('Register success');
            navigate('/login');
        }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <FormShare column={register} onSubmit={onSubmit} />
    )
}

export default Register;
import { FormShareModalBlockColumn } from "../shared/FormShare.const";

export const login: FormShareModalBlockColumn = {
    title: "Login",
    row: [
        {
            title: "Email",
            property: "email",
            type: "email",
            validation: ["required", "email"],
        },
        {
            title: "Password",
            property: "password",
            type: "password",
            validation: ["required"],
        },
    ],
};

export const register: FormShareModalBlockColumn = {
    title: "Register",
    row: [
        {
            title: "Name",
            property: "name",
            type: "text",
            validation: ["required"],
        },
        {
            title: "Email",
            property: "email",
            type: "email",
            validation: ["required", "email"],
        },
        {
            title: "Password",
            property: "password",
            type: "password",
            validation: ["required"],
        },
        {
            title: "Confirm Password",
            property: "confirmPassword",
            type: "confirmPassword",
            validation: ["required"],
        }
    ],
};
import { FormShareBlockColumn } from "../shared/FormShare.const";

export const loginBlockColumn: FormShareBlockColumn = {
    title: "Login",
    row: [
        {
            title: "Email",
            property: "username",
            type: "email",
            validation: ["required", "email"],
            placeholder: "Email Address"
        },
        {
            title: "Password",
            property: "password",
            type: "password",
            validation: ["required"],
            placeholder: "Password"
        },
    ],
    redirect: {
        title: "Register",
        link: "/register"
    },
    button: "Login",
};

export const registerBlockColumn: FormShareBlockColumn = {
    title: "Register",
    row: [
        {
            title: "Name",
            property: "name",
            type: "text",
            validation: ["required"],
            placeholder: "Full Name"
        },
        {
            title: "Email",
            property: "email",
            type: "email",
            validation: ["required", "email"],
            placeholder: "Email Address"
        },
        {
            title: "Password",
            property: "password",
            type: "password",
            validation: ["required", "password"],
            placeholder: "Password"
        },
        {
            title: "Confirm Password",
            property: "confirmPassword",
            type: "password",
            validation: ["required", "confirmPassword"],
            placeholder: "Confirm Password"
        }
    ],
    redirect: {
        title: "Login",
        link: "/login"
    },
    button: "Register",
};

export interface LoginModel {
    username: string;
    password: string;
}

export interface RegisterModel {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface AuthResponse {
    access_token: string;
    user: {
        id: string;
        name: string;
        email: string;
    }
}
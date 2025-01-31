import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import Auth from '../utils/auth';
import { login } from "../api/authAPI";
const Login = () => {
    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });
    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
            ...loginData,
            [name]: value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await login(loginData);
            Auth.login(data.token);
        }
        catch (err) {
            console.error('Failed to login', err);
        }
    };
    return (_jsx("div", { className: 'container', children: _jsxs("form", { className: 'form', onSubmit: handleSubmit, children: [_jsx("h1", { children: "Login" }), _jsx("label", { children: "Username" }), _jsx("input", { type: 'text', name: 'username', value: loginData.username || '', onChange: handleChange }), _jsx("label", { children: "Password" }), _jsx("input", { type: 'password', name: 'password', value: loginData.password || '', onChange: handleChange }), _jsx("button", { type: 'submit', children: "Submit Form" })] }) }));
};
export default Login;

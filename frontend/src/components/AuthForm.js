import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import LoginForm from "./LoginForm.tsx";
import SignUpForm from "./SignUpForm.tsx";
import { Box, Button } from "@mui/material";
const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
    return (_jsxs(Box, { display: "flex", flexDirection: "column", alignItems: "center", children: [isLogin ? _jsx(LoginForm, {}) : _jsx(SignUpForm, {}), _jsx(Box, { display: "flex", justifyContent: "center", sx: { mt: 2 }, children: _jsx(Button, { onClick: () => setIsLogin(prev => !prev), sx: { color: '#1F1F1F' }, children: isLogin ? "Регистрация" : "Уже есть аккаунт" }) })] }));
};
export default AuthForm;

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { TextField, Button, Container, Typography, Box, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useValidateLoginData from "../helpers/useValidateLoginData.ts";
import { useDispatch } from "react-redux";
import { login } from '../store/userSlice.ts';
const LoginForm = () => {
    const dispatch = useDispatch();
    const [userLogin, setUserLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const isLoginFieldsFilled = useValidateLoginData({ login: userLogin, password });
    const handleLogin = async () => {
        try {
            await dispatch(login({ login: userLogin, password: password })).unwrap();
            navigate("/tasks");
        }
        catch (error) {
            setError(error);
        }
    };
    return (_jsx(Container, { maxWidth: "xs", sx: { display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }, children: _jsxs(Box, { sx: { display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }, children: [_jsx(Typography, { variant: "h5", children: "\u0412\u0445\u043E\u0434" }), error && _jsx(Alert, { severity: "error", sx: { width: "100%", mt: 2 }, children: error }), _jsxs(Box, { sx: { mt: 2, width: "100%" }, children: [_jsx(TextField, { fullWidth: true, label: "\u041B\u043E\u0433\u0438\u043D", variant: "outlined", margin: "normal", value: userLogin, onChange: (e) => setUserLogin(e.target.value) }), _jsx(TextField, { fullWidth: true, label: "\u041F\u0430\u0440\u043E\u043B\u044C", type: "password", variant: "outlined", margin: "normal", value: password, onChange: (e) => setPassword(e.target.value) }), _jsx(Button, { fullWidth: true, variant: "contained", color: "primary", sx: { mt: 2, backgroundColor: '#1F1F1F' }, onClick: handleLogin, disabled: !isLoginFieldsFilled, children: "\u0412\u043E\u0439\u0442\u0438" })] })] }) }));
};
export default LoginForm;

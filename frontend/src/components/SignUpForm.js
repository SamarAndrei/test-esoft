import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { TextField, Button, Container, Typography, Box, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useValidateSignUpData from "../helpers/useValidateSignUpData.ts";
import { registration } from "../store/userSlice.ts";
import { useDispatch } from "react-redux";
const SignUpForm = () => {
    const dispatch = useDispatch();
    const [userLogin, setUserLogin] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const isSignUpFieldsFilled = useValidateSignUpData({ firstName, lastName, login: userLogin, password, middleName });
    const handleSignUp = async () => {
        try {
            await dispatch(registration({ firstName, lastName, login: userLogin, password, middleName })).unwrap();
            navigate("/tasks");
        }
        catch (error) {
            setError(error);
        }
    };
    return (_jsx(Container, { maxWidth: "xs", sx: { display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }, children: _jsxs(Box, { sx: { display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }, children: [_jsx(Typography, { variant: "h5", children: "\u0420\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u044F" }), error && _jsx(Alert, { severity: "error", sx: { width: "100%", mt: 2 }, children: error }), _jsxs(Box, { sx: { mt: 2, width: "100%" }, children: [_jsx(TextField, { fullWidth: true, label: "\u0418\u043C\u044F", variant: "outlined", margin: "normal", value: firstName, onChange: (e) => setFirstName(e.target.value) }), _jsx(TextField, { fullWidth: true, label: "\u0424\u0430\u043C\u0438\u043B\u0438\u044F", variant: "outlined", margin: "normal", value: lastName, onChange: (e) => setLastName(e.target.value) }), _jsx(TextField, { fullWidth: true, label: "\u041E\u0442\u0447\u0435\u0441\u0442\u0432\u043E (\u041D\u0435\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u043E)", variant: "outlined", margin: "normal", value: middleName, onChange: (e) => setMiddleName(e.target.value) }), _jsx(TextField, { fullWidth: true, label: "\u041B\u043E\u0433\u0438\u043D", variant: "outlined", margin: "normal", value: userLogin, onChange: (e) => setUserLogin(e.target.value) }), _jsx(TextField, { fullWidth: true, label: "\u041F\u0430\u0440\u043E\u043B\u044C", type: "password", variant: "outlined", margin: "normal", value: password, onChange: (e) => setPassword(e.target.value) }), _jsx(Button, { fullWidth: true, variant: "contained", color: "primary", sx: { mt: 2 }, onClick: handleSignUp, disabled: !isSignUpFieldsFilled, children: "\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u0442\u044C\u0441\u044F" })] })] }) }));
};
export default SignUpForm;

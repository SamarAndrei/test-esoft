import { useState } from "react";
import { TextField, Button, Container, Typography, Box, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useValidateSignUpData from "../helpers/useValidateSignUpData.ts";
import {registration} from "../store/userSlice.ts";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../store/store.ts";

const SignUpForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const [userLogin, setUserLogin] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const isSignUpFieldsFilled = useValidateSignUpData({firstName, lastName, login: userLogin, password, middleName});

    const handleSignUp = async () => {
        try {
            await dispatch(registration({firstName, lastName, login: userLogin, password, middleName})).unwrap();
            navigate("/tasks");
        } catch (error) {
            // @ts-ignore
            setError(error);
        }
    };

    return (
        <Container maxWidth="xs" sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                <Typography variant="h5">Регистрация</Typography>
                {error && <Alert severity="error" sx={{ width: "100%", mt: 2 }}>{error}</Alert>}
                <Box sx={{ mt: 2, width: "100%" }}>
                    <TextField
                        fullWidth
                        label="Имя"
                        variant="outlined"
                        margin="normal"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Фамилия"
                        variant="outlined"
                        margin="normal"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Отчество (Необязательно)"
                        variant="outlined"
                        margin="normal"
                        value={middleName}
                        onChange={(e) => setMiddleName(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Логин"
                        variant="outlined"
                        margin="normal"
                        value={userLogin}
                        onChange={(e) => setUserLogin(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        label="Пароль"
                        type="password"
                        variant="outlined"
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button fullWidth variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleSignUp} disabled={!isSignUpFieldsFilled}>
                        Зарегистрироваться
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default SignUpForm;
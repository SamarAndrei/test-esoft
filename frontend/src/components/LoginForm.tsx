import { useState } from "react";
import { TextField, Button, Container, Typography, Box, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useValidateLoginData from "../helpers/useValidateLoginData.ts";
import {useDispatch} from "react-redux";
import { login } from '../store/userSlice.ts';
import {AppDispatch} from "../store/store.ts";


const LoginForm: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const [userLogin, setUserLogin] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const isLoginFieldsFilled = useValidateLoginData({login: userLogin, password});


    const handleLogin  = async () => {
        try {
            await dispatch(login({ login: userLogin, password: password })).unwrap();
            navigate("/tasks");

        } catch(error) {
            // @ts-ignore
            setError(error);
        }
    };

    return (
        <Container maxWidth="xs" sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
                <Typography variant="h5">Вход</Typography>
                {error && <Alert severity="error" sx={{ width: "100%", mt: 2 }}>{error}</Alert>}
                <Box sx={{ mt: 2, width: "100%" }}>
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
                    <Button fullWidth variant="contained" color="primary" sx={{ mt: 2, backgroundColor: '#1F1F1F'}} onClick={handleLogin} disabled={!isLoginFieldsFilled}>
                        Войти
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default LoginForm;
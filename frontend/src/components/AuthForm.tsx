import { useState } from "react";
import LoginForm from "./LoginForm.tsx";
import SignUpForm from "./SignUpForm.tsx";
import {Box, Button} from "@mui/material";


const AuthForm: React.FC = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            {isLogin ? <LoginForm /> : <SignUpForm />}
            <Box display="flex" justifyContent="center" sx={{mt: 2}}>
                <Button onClick={() => setIsLogin(prev => !prev)} sx={{ color: '#1F1F1F' }}>
                    {isLogin ? "Регистрация" : "Уже есть аккаунт"}
                </Button>
            </Box>
        </Box>
    );
};

export default AuthForm;
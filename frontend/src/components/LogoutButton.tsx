import {Box, Button} from "@mui/material";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../store/store.ts";
import {logout} from "../store/userSlice.ts";
import {useNavigate} from "react-router-dom";

const LogoutButton = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate()
    const handleLogout = () => {
        dispatch(logout())
        navigate('/')
    }

    return (
        <Box mr={1}>
            <Button variant="contained" color="secondary" onClick={handleLogout}>
                Выйти
            </Button>
        </Box>
    );
};

export default LogoutButton;
import { jsx as _jsx } from "react/jsx-runtime";
import { Box, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../store/userSlice.ts";
import { useNavigate } from "react-router-dom";
const LogoutButton = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };
    return (_jsx(Box, { mr: 1, children: _jsx(Button, { variant: "contained", color: "secondary", onClick: handleLogout, sx: { backgroundColor: '#97C2EC' }, children: "\u0412\u044B\u0439\u0442\u0438" }) }));
};
export default LogoutButton;

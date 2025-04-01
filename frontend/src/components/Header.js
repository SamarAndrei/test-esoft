import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { AppBar, Box, Container, Toolbar, Typography, Link, } from '@mui/material';
import useCheckAuth from "../hooks/useCheckAuth.ts";
import CreateTaskButton from "./CreateTaskButton.tsx";
import LogoutButton from "./LogoutButton.tsx";
const Header = React.memo(() => {
    const store = useCheckAuth();
    return (_jsx("header", { children: _jsx(Box, { sx: { flexGrow: 1 }, children: _jsx(AppBar, { position: "fixed", sx: { backgroundColor: '#1F1F1F' }, children: _jsx(Container, { fixed: true, children: _jsxs(Toolbar, { sx: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [_jsx(Link, { href: "/", color: "inherit", underline: "none", children: _jsx(Typography, { variant: "h6", children: "TODO list" }) }), store.isLoading === false ? (store.role === "Руководитель" && _jsx(CreateTaskButton, {})) : (_jsx(Typography, { children: "wait a second" })), store.isAuth && _jsx(LogoutButton, {})] }) }) }) }) }));
});
export default Header;

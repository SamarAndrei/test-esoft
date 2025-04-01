import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Typography, styled } from '@mui/material';
const NotFoundContainer = styled('div')(({ theme }) => ({
    textAlign: 'center',
    padding: theme.spacing(40),
}));
const NoMatchPage = () => {
    return (_jsx("main", { children: _jsxs(NotFoundContainer, { children: [_jsx(Typography, { variant: "h1", gutterBottom: true, children: "404" }), _jsx(Typography, { variant: "h5", gutterBottom: true, children: "\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u0430" }), _jsx(Button, { href: "/", variant: "outlined", color: "error", children: "\u0412\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F \u043D\u0430 \u0433\u043B\u0430\u0432\u043D\u0443\u044E" })] }) }));
};
export default NoMatchPage;

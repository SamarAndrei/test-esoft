import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Container, Divider, } from '@mui/material';
import Socials from './Socials';
import React from 'react';
const Footer = React.memo(() => {
    return (_jsxs("footer", { children: [_jsx(Divider, { sx: { marginTop: 4 } }), _jsx(Container, { fixed: true, sx: { marginTop: 4 }, children: _jsx(Socials, {}) })] }));
});
export default Footer;

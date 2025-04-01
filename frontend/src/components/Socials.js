import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, IconButton, Link } from '@mui/material';
import TelegramIcon from '@mui/icons-material/Telegram';
import GitHubIcon from '@mui/icons-material/GitHub';
const Socials = () => {
    return (_jsxs(Box, { sx: { marginBottom: 1 }, children: [_jsx(Link, { href: "https://t.me/dirtymonke", color: "inherit", children: _jsx(IconButton, { size: "large", "aria-label": "telegram", "aria-haspopup": "false", color: "inherit", children: _jsx(TelegramIcon, {}) }) }), _jsx(Link, { href: "https://github.com/SamarAndrei", color: "inherit", children: _jsx(IconButton, { size: "large", "aria-label": "github", "aria-haspopup": "false", color: "inherit", children: _jsx(GitHubIcon, {}) }) })] }));
};
export default Socials;

import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Header from "./Header.tsx";
import { Outlet } from "react-router-dom";
import Footer from "./Footer.tsx";
const Layout = () => {
    return (_jsxs("div", { children: [_jsx(Header, {}), _jsx(Outlet, {}), _jsx(Footer, {})] }));
};
export default Layout;

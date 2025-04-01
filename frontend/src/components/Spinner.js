import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import CircularProgress from '@mui/material/CircularProgress';
import { Grid } from '@mui/material';
const Spinner = () => {
    return (_jsxs(Grid, { container: true, justifyContent: "center", mt: 4, sx: { marginTop: 10 }, children: [_jsx("svg", { width: 0, height: 0, children: _jsx("defs", { children: _jsxs("linearGradient", { id: "my_gradient", x1: "0%", y1: "0%", x2: "0%", y2: "100%", children: [_jsx("stop", { offset: "0%", stopColor: "#e01cd5" }), _jsx("stop", { offset: "100%", stopColor: "#1CB5E0" })] }) }) }), _jsx(CircularProgress, { sx: {
                    'svg circle': { stroke: 'url(#my_gradient)' },
                } })] }));
};
export default Spinner;

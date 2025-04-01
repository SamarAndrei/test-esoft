import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Grid, Typography } from '@mui/material';
const Fallback = ({ error /** тут еще функцию ресета можно заюзать*/, }) => {
    return (_jsx("div", { role: "alert", children: _jsxs(Grid, { container: true, justifyContent: "center", mt: 4, children: [_jsx(Typography, { children: "Something went wrong:" }), _jsx("pre", { style: { color: 'red' }, children: error.message })] }) }));
};
export { Fallback };

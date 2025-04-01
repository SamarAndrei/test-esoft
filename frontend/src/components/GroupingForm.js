import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Container, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { useSelector } from "react-redux";
const GroupingForm = ({ setGrouping }) => {
    const [groupingValue, setGroupingValue] = useState("");
    const store = useSelector((state) => state.user);
    const handleGroupingChange = (e) => {
        const value = e.target.value;
        setGroupingValue(value);
        setGrouping(value);
    };
    return (_jsx(Container, { sx: { mt: 12 }, children: _jsxs(FormControl, { fullWidth: true, children: [_jsx(InputLabel, { id: "demo-simple-select-label", children: "\u0413\u0440\u0443\u043F\u043F\u0438\u0440\u043E\u0432\u043A\u0430 \u043F\u043E:" }), _jsxs(Select, { value: groupingValue, onChange: handleGroupingChange, children: [_jsx(MenuItem, { value: "none", children: "\u0411\u0435\u0437 \u0433\u0440\u0443\u043F\u043F\u0438\u0440\u043E\u0432\u043A\u0438" }), _jsx(MenuItem, { value: "today", children: "\u041D\u0430 \u0441\u0435\u0433\u043E\u0434\u043D\u044F" }), _jsx(MenuItem, { value: "week", children: "\u041D\u0430 \u043D\u0435\u0434\u0435\u043B\u044E" }), _jsx(MenuItem, { value: "future", children: "\u041D\u0430 \u0431\u0443\u0434\u0443\u0449\u0435\u0435" }), store.role === 'Руководитель' && _jsx(MenuItem, { value: "assignee", children: "\u041F\u043E \u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u043C(\u0410-\u042F)" })] })] }) }));
};
export default GroupingForm;

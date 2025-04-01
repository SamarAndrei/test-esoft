import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
const TaskModal = ({ open, handleClose, taskData, setTaskData, handleChange, handleSubmitCreate, handleSubmitUpdate, users, isValid, editingTask }) => {
    const store = useSelector((state) => state.user);
    // @ts-ignore
    const isManager = store.role === 'Руководитель';
    useEffect(() => {
        if (editingTask) {
            setTaskData(editingTask);
        }
    }, [editingTask, open, setTaskData]);
    if (!taskData)
        return null;
    return (_jsx(Modal, { open: open, onClose: handleClose, children: _jsxs(Box, { sx: {
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'white',
                boxShadow: 24, p: 4, borderRadius: 2
            }, children: [_jsx(IconButton, { onClick: handleClose, sx: { position: 'absolute', top: 8, right: 8 }, children: _jsx(CloseIcon, {}) }), _jsx(Typography, { variant: "h6", gutterBottom: true, children: editingTask ? "Редактировать задачу" : "Создать задачу" }), _jsx(TextField, { fullWidth: true, margin: "normal", label: "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435", name: "title", value: taskData.title, onChange: handleChange, disabled: !isManager }), _jsx(TextField, { fullWidth: true, margin: "normal", label: "\u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435", name: "description", multiline: true, rows: 3, value: taskData.description, onChange: handleChange, disabled: !isManager }), _jsxs(FormControl, { sx: { m: 1, minWidth: 120 }, size: "small", children: [_jsx(InputLabel, { children: "\u041F\u0440\u0438\u043E\u0440\u0438\u0442\u0435\u0442" }), _jsxs(Select, { id: "demo-select-small", value: taskData.priority, label: "Priority", onChange: handleChange, name: "priority", disabled: !isManager, children: [_jsx(MenuItem, { value: 'высокий', children: "\u0432\u044B\u0441\u043E\u043A\u0438\u0439" }), _jsx(MenuItem, { value: 'средний', children: "\u0441\u0440\u0435\u0434\u043D\u0438\u0439" }), _jsx(MenuItem, { value: 'низкий', children: "\u043D\u0438\u0437\u043A\u0438\u0439" })] })] }), _jsxs(FormControl, { sx: { m: 1, minWidth: 120 }, size: "small", children: [_jsx(InputLabel, { children: "\u0421\u0442\u0430\u0442\u0443\u0441" }), _jsxs(Select, { id: "demo-select-small", value: taskData.status, label: "Status", onChange: handleChange, name: "status", children: [_jsx(MenuItem, { value: 'к выполнению', children: "\u043A \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044E" }), _jsx(MenuItem, { value: 'выполняется', children: "\u0432\u044B\u043F\u043E\u043B\u043D\u044F\u0435\u0442\u0441\u044F" }), _jsx(MenuItem, { value: 'выполнена', children: "\u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0430" }), _jsx(MenuItem, { value: 'отменена', children: "\u043E\u0442\u043C\u0435\u043D\u0435\u043D\u0430" })] })] }), _jsxs(FormControl, { sx: { m: 1, minWidth: 120 }, size: "small", children: [_jsx(InputLabel, { id: "demo-select-small-label", children: "\u041E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439" }), _jsx(Select, { labelId: "demo-select-small-label", id: "demo-select-small", value: taskData.assigneeId, label: "\u041E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439", onChange: handleChange, name: "assigneeId", disabled: !isManager, children: users.map((user) => (_jsx(MenuItem, { value: user.id, children: `${user.firstName} ${user.lastName}` }, user.id))) })] }), _jsx(TextField, { fullWidth: true, margin: "normal", label: "\u0414\u0430\u0442\u0430 \u043E\u043A\u043E\u043D\u0447\u0430\u043D\u0438\u044F", name: "due_date", type: "date", InputLabelProps: { shrink: true }, value: taskData.due_date.split("T")[0], onChange: handleChange, disabled: !isManager }), _jsx(Button, { fullWidth: true, variant: "contained", color: "primary", onClick: editingTask ? handleSubmitUpdate : handleSubmitCreate, sx: { mt: 2, backgroundColor: '#1F1F1F' }, disabled: !isValid, children: editingTask ? "Обновить" : "Создать" })] }) }));
};
export default TaskModal;

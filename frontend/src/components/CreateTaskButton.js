import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Button, Box, } from '@mui/material';
import UserService from "../services/user.service.ts";
import useValidateCreateTaskdata from "../helpers/useValidateCreateTaskdata.ts";
import TasksService from "../services/task.service.ts";
import TaskModal from "./TaskModal.tsx";
const CreateTaskButton = () => {
    const [open, setOpen] = useState(false);
    const [taskData, setTaskData] = useState({ title: '', description: '', priority: '', due_date: '', status: '', assigneeId: '' });
    const [users, setUsers] = useState([]);
    const { isValid } = useValidateCreateTaskdata(taskData);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setTaskData({ title: '', description: '', priority: '', due_date: '', status: '', assigneeId: '' });
    };
    const handleChange = (e) => {
        setTaskData({ ...taskData, [e.target.name]: e.target.value });
    };
    const handleSubmitCreate = async () => {
        const updatedTaskData = { ...taskData, due_date: new Date(taskData.due_date).toISOString() };
        if (isValid) {
            await TasksService.createTask(updatedTaskData);
            handleClose();
        }
    };
    useEffect(() => {
        UserService.fetchUsers()
            .then(res => setUsers(res.data))
            .catch(e => console.error(e, "Ошибка запроса пользователей"));
    }, []);
    return (_jsxs(Box, { mr: 1, children: [_jsx(Button, { variant: "contained", color: "secondary", onClick: handleOpen, sx: { backgroundColor: '#97C2EC' }, children: "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0437\u0430\u0434\u0430\u0447\u0443" }), _jsx(TaskModal, { open: open, handleClose: handleClose, taskData: taskData, setTaskData: setTaskData, handleChange: handleChange, handleSubmitCreate: handleSubmitCreate, handleSubmitUpdate: () => { }, users: users, isValid: isValid, editingTask: null })] }));
};
export default CreateTaskButton;

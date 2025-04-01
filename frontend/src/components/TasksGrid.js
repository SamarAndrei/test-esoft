import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Container, Grid, Paper, Typography } from '@mui/material';
import { getStatusColor } from "../helpers/getStatusColor.ts";
import GroupingForm from "./GroupingForm.tsx";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import TasksService from "../services/task.service.ts";
import UserService from "../services/user.service.ts";
import TaskModal from "./TaskModal.tsx";
import useValidateCreateTaskdata from "../helpers/useValidateCreateTaskdata.ts";
const TasksGrid = () => {
    const [grouping, setGrouping] = useState("");
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);
    const [usersData, setUsersData] = useState({});
    const [open, setOpenModal] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedTask, setSelectedTask] = useState(null);
    const [filteredSelectedTask, setFilteredSelectedTask] = useState({ title: '', description: '', priority: '', due_date: '', status: '', assigneeId: '' });
    const { errors, isValid } = useValidateCreateTaskdata(filteredSelectedTask);
    const handleOpen = (task) => {
        setSelectedTask(task);
        setOpenModal(true);
    };
    const handleClose = () => {
        setOpenModal(false);
        setSelectedTask(null);
    };
    const handleChangeUpdate = (e) => {
        if (!selectedTask)
            return;
        const { id, createdAt, updatedAt, creatorId, due_date, ...filteredSelectedTask } = selectedTask;
        const formattedDueDate = new Date(due_date.split('T')[0]);
        const finalTaskData = {
            ...filteredSelectedTask,
            due_date: formattedDueDate
        };
        setFilteredSelectedTask(finalTaskData);
        if (isValid) {
            if (e.target.name === 'due_date') {
                setSelectedTask({ ...selectedTask, [e.target.name]: new Date(e.target.value).toISOString() });
            }
            else {
                setSelectedTask({ ...selectedTask, [e.target.name]: e.target.value });
            }
        }
    };
    const handleSubmitUpdate = async () => {
        if (selectedTask) {
            const { id, createdAt, updatedAt, creatorId, ...filteredSelectedTask } = selectedTask;
            await TasksService.updateTask(selectedTask.id, filteredSelectedTask);
            setOpenModal(false);
            setSelectedTask(null);
        }
    };
    useEffect(() => {
        if (grouping) {
            setSearchParams({ sort: grouping });
        }
        else {
            setSearchParams({ sort: "none" });
        }
    }, [grouping]);
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await TasksService.getAllTask(searchParams);
                setTasks(res.data);
            }
            catch (e) {
                console.error(e, "Ошибка запроса задач");
            }
        };
        fetchTasks();
    }, [searchParams, selectedTask]);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await UserService.fetchUsers();
                setUsers(res.data);
                const usersMap = res.data.reduce((acc, user) => {
                    acc[user.id] = user;
                    return acc;
                }, {});
                setUsersData(usersMap);
            }
            catch (e) {
                console.error(e, "Ошибка запроса пользователей");
            }
        };
        fetchUsers();
    }, [tasks]);
    return (_jsxs(Container, { sx: { mt: 12 }, children: [_jsx(GroupingForm, { setGrouping: setGrouping }), _jsxs(Grid, { container: true, spacing: 1, sx: { mt: 4 }, children: [tasks.length > 0
                        ? tasks.map((task) => (_jsx(Grid, { item: true, xs: 12, sm: 6, md: 4, onClick: () => handleOpen(task), children: _jsxs(Paper, { elevation: 3, style: { padding: 16, cursor: 'pointer' }, children: [_jsx(Typography, { variant: "h6", style: { color: getStatusColor(task.status, task.due_date) }, children: task.title }), _jsxs(Typography, { variant: "body2", children: ["\u041F\u0440\u0438\u043E\u0440\u0438\u0442\u0435\u0442: ", task.priority] }), _jsxs(Typography, { variant: "body2", children: ["\u0414\u0430\u0442\u0430 \u043E\u043A\u043E\u043D\u0447\u0430\u043D\u0438\u044F: ", task.due_date.split("T")[0]] }), _jsxs(Typography, { variant: "body2", children: ["\u0421\u0442\u0430\u0442\u0443\u0441: ", task.status] }), _jsxs(Typography, { variant: "body2", children: ["\u041E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439: ", usersData[task.assigneeId]
                                                ? `${usersData[task.assigneeId].firstName} ${usersData[task.assigneeId].lastName}`
                                                : "Загрузка..."] })] }) }, task.id)))
                        : _jsx(Typography, { children: " \u0423 \u0432\u0430\u0441 \u043D\u0435\u0442 \u0437\u0430\u0434\u0430\u0447 " }), _jsx(TaskModal, { open: open, handleClose: handleClose, taskData: selectedTask, setTaskData: setSelectedTask, handleChange: handleChangeUpdate, handleSubmitCreate: () => { }, handleSubmitUpdate: handleSubmitUpdate, users: users, isValid: isValid, editingTask: selectedTask })] })] }));
};
export default TasksGrid;

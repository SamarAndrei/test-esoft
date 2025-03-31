import {useEffect, useState} from 'react';
import {
    Button,
    Box,
} from '@mui/material';
import UserService from "../services/user.service.ts";
import useValidateCreateTaskdata from "../helpers/useValidateCreateTaskdata.ts";
import TasksService from "../services/task.service.ts";
import TaskModal from "./TaskModal.tsx";

const CreateTaskButton = () => {
    const [open, setOpen] = useState(false);
    const [taskData, setTaskData] = useState({ title: '', description: '', priority: '', due_date: '', status: '', assigneeId: ''});
    const [users, setUsers] = useState([]);
    const { errors, isValid } = useValidateCreateTaskdata(taskData);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setTaskData({ title: '', description: '', priority: '', due_date: '', status: '', assigneeId: ''})
    };
    const handleChangeCreate = (e) => {
        setTaskData({ ...taskData, [e.target.name]: e.target.value });
    };

    const handleSubmitCreate = async () => {
        const updatedTaskData = { ...taskData, due_date: new Date(taskData.due_date).toISOString() };

        if (isValid) {
            await TasksService.createTask(updatedTaskData)
            handleClose();
        }
    };

    useEffect(() => {
        UserService.fetchUsers()
            .then(res => setUsers(res.data))
            .catch(e => console.error(e, "Ошибка запроса пользователей"))
    }, []);

    return (
        <Box mr={1}>
            <Button variant="contained" color="secondary" onClick={handleOpen}>
                Создать задачу
            </Button>
            <TaskModal
                open={open}
                handleClose={handleClose}
                taskData={taskData}
                setTaskData={setTaskData}
                handleChangeCreate={handleChangeCreate}
                handleSubmitCreate={handleSubmitCreate}
                users={users}
                isValid={isValid}
            />
        </Box>
    );
};

export default CreateTaskButton;
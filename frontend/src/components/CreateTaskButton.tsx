import {useEffect, useState} from 'react';
import {
    Button,
    Box,
} from '@mui/material';
import UserService from "../services/user.service.ts";
import useValidateCreateTaskdata from "../helpers/useValidateCreateTaskdata.ts";
import TasksService from "../services/task.service.ts";
import TaskModal from "./TaskModal.tsx";
import {IUser} from "../models/IUser.ts";

const CreateTaskButton = () => {
    const [open, setOpen] = useState(false);
    const [taskData, setTaskData] = useState({ title: '', description: '', priority: '', due_date: '', status: '', assigneeId: ''});
    const [users, setUsers] = useState<IUser[]>([]);
    const { isValid } = useValidateCreateTaskdata(taskData);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setTaskData({ title: '', description: '', priority: '', due_date: '', status: '', assigneeId: ''})
    };
    const handleChange = (e: any) => {
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
            <Button variant="contained" color="secondary" onClick={handleOpen} sx={{ backgroundColor: '#97C2EC' }}>
                Создать задачу
            </Button>
            <TaskModal
                open={open}
                handleClose={handleClose}
                // @ts-ignore
                taskData={taskData}
                // @ts-ignore
                setTaskData={setTaskData}
                handleChange={handleChange}
                handleSubmitCreate={handleSubmitCreate}
                handleSubmitUpdate={() => {}}
                users={users}
                isValid={isValid}
                editingTask={null}
            />
        </Box>
    );
};

export default CreateTaskButton;
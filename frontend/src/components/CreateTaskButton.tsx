import {useEffect, useState} from 'react';
import {
    Button,
    Modal,
    Box,
    TextField,
    Typography,
    InputLabel,
    FormControl,
    Select,
    MenuItem,
    IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {IUser} from "../models/IUser.ts";
import UserService from "../services/user.service.ts";
import useValidateCreateTaskdata from "../helpers/useValidateCreateTaskdata.ts";
import TasksService from "../services/task.service.ts";

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
    const handleChange = (e) => {
        setTaskData({ ...taskData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
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
            <Modal open={open} onClose={handleClose}>
                <Box sx={{
                    position: 'absolute', top: '50%', left: '50%',
                    transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'white',
                    boxShadow: 24, p: 4, borderRadius: 2
                }}>
                    <IconButton
                        onClick={handleClose}
                        sx={{ position: 'absolute', top: 8, right: 8 }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" gutterBottom>Создание задачи</Typography>
                    <TextField
                        fullWidth margin="normal" label="Название" name="title"
                        value={taskData.title} onChange={handleChange} />
                    <TextField
                        fullWidth margin="normal" label="Описание" name="description"
                        multiline rows={3} value={taskData.description} onChange={handleChange} />
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel>Приоритет</InputLabel>
                        <Select
                            id="demo-select-small"
                            value={taskData.priority}
                            label="Priority"
                            onChange={handleChange}
                            name="priority"
                        >
                            <MenuItem value={'высокий'}>высокий</MenuItem>
                            <MenuItem value={'средний'}>средний</MenuItem>
                            <MenuItem value={'низкий'}>низкий</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel>Статус</InputLabel>
                        <Select
                            id="demo-select-small"
                            value={taskData.status}
                            label="Status"
                            onChange={handleChange}
                            name="status"
                        >
                            <MenuItem value={'к выполнению'}>к выполнению</MenuItem>
                            <MenuItem value={'выполняется'}>выполняется</MenuItem>
                            <MenuItem value={'выполнена'}>выполнена</MenuItem>
                            <MenuItem value={'отменена'}>отменена</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel id="demo-select-small-label">Ответственный</InputLabel>
                        <Select
                            labelId="demo-select-small-label"
                            id="demo-select-small"
                            value={taskData.assigneeId}
                            label="Ответственный"
                            onChange={handleChange}
                            name="assigneeId"
                        >
                            {users.map((user: IUser) => <MenuItem value={user.id}>{`${user.firstName} ${user.lastName}`}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <TextField
                        fullWidth margin="normal" label="Дата окончания" name="due_date" type="date"
                        InputLabelProps={{ shrink: true }} value={taskData.due_date} onChange={handleChange} />
                    <Button fullWidth variant="contained" color="primary" onClick={handleSubmit} sx={{ mt: 2 }} disabled={!isValid}>
                        Создать
                    </Button>
                </Box>
            </Modal>
        </Box>
    );
};

export default CreateTaskButton;
import React, {useEffect} from 'react';
import {
    Box,
    Button,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Modal,
    Select,
    TextField,
    Typography
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { IUser } from "../models/IUser.ts";
import {ITask} from "../models/ITask.ts";
import {useSelector} from "react-redux";
import {RootState} from "../store/store.ts";

interface TaskModalProps {
    open: boolean;
    handleClose: () => void;
    taskData: ITask | null;
    setTaskData: (task: ITask) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => void;
    handleSubmitCreate: () => void;
    handleSubmitUpdate: () => void;
    users: IUser[];
    isValid: boolean;
    editingTask?: ITask | null;
}

const TaskModal: React.FC<TaskModalProps> = ({
     open,
     handleClose,
     taskData,
     setTaskData,
     handleChange,
     handleSubmitCreate,
     handleSubmitUpdate,
     users,
     isValid,
     editingTask
}: TaskModalProps) => {

    const store = useSelector((state: RootState) => state.user);
    // @ts-ignore
    const isManager = store.role === 'Руководитель';


    useEffect(() => {
        if (editingTask) {
            setTaskData(editingTask);
        }
    }, [editingTask, open, setTaskData]);

    if (!taskData) return null;

    return (
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
                <Typography variant="h6" gutterBottom>{editingTask ? "Редактировать задачу" : "Создать задачу"}</Typography>
                <TextField
                    fullWidth margin="normal" label="Название" name="title"
                    value={taskData.title} onChange={handleChange} disabled={!isManager}/>
                <TextField
                    fullWidth margin="normal" label="Описание" name="description"
                    multiline rows={3} value={taskData.description} onChange={handleChange} disabled={!isManager}/>
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <InputLabel>Приоритет</InputLabel>
                    <Select
                        id="demo-select-small"
                        value={taskData.priority}
                        label="Priority"
                        // @ts-ignore
                        onChange={handleChange}
                        name="priority"
                        disabled={!isManager}
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
                        // @ts-ignore
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
                        // @ts-ignore
                        onChange={handleChange}
                        name="assigneeId"
                        disabled={!isManager}
                    >
                        {users.map((user: IUser) => (
                            <MenuItem key={user.id} value={user.id}>
                                {`${user.firstName} ${user.lastName}`}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    fullWidth margin="normal" label="Дата окончания" name="due_date" type="date"
                    InputLabelProps={{ shrink: true }} value={taskData.due_date.split("T")[0]} onChange={handleChange} disabled={!isManager}/>
                <Button fullWidth variant="contained" color="primary" onClick={editingTask ? handleSubmitUpdate : handleSubmitCreate} sx={{ mt: 2, backgroundColor: '#1F1F1F' }} disabled={!isValid}>
                    {editingTask ? "Обновить" : "Создать"}
                </Button>
            </Box>
        </Modal>
    );
};

export default TaskModal;

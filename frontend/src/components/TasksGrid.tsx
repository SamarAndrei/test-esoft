import { Container, Grid, Paper, Typography } from '@mui/material';
import { getStatusColor } from "../helpers/getStatusColor.ts";
import GroupingForm from "./GroupingForm.tsx";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import TasksService from "../services/task.service.ts";
import { AxiosResponse } from "axios";
import { ITask } from "../models/ITask.ts";
import UserService from "../services/user.service.ts";
import TaskModal from "./TaskModal.tsx";
import {IUser} from "../models/IUser.ts";
import useValidateCreateTaskdata from "../helpers/useValidateCreateTaskdata.ts";

const TasksGrid = () => {
    const [grouping, setGrouping] = useState("");
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [users, setUsers] = useState<IUser[]>([])
    const [usersData, setUsersData] = useState<{ [key: string]: IUser }>({});
    const [open, setOpenModal] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedTask, setSelectedTask] = useState<ITask | null>(null);
    const [filteredSelectedTask, setFilteredSelectedTask] = useState({ title: '', description: '', priority: '', due_date: '', status: '', assigneeId: ''})
    const { errors, isValid } = useValidateCreateTaskdata(filteredSelectedTask);

    const handleOpen = (task: ITask) => {
        setSelectedTask(task);
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
        setSelectedTask(null);
    };

    const handleChangeUpdate = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }>) => {
        if (!selectedTask) return;
        const {id, createdAt, updatedAt, creatorId, due_date, ...filteredSelectedTask} = selectedTask;
        const formattedDueDate = new Date(due_date.split('T')[0]);
        const finalTaskData = {
            ...filteredSelectedTask,
            due_date: formattedDueDate
        };
        setFilteredSelectedTask(finalTaskData)
        if (isValid) {
            if (e.target.name === 'due_date') {
                setSelectedTask({...selectedTask, [e.target.name as string]: new Date(e.target.value).toISOString()});
            } else {
                setSelectedTask({...selectedTask, [e.target.name as string]: e.target.value});
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
        } else {
            setSearchParams({ sort: "none" });
        }
    }, [grouping]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res: AxiosResponse<ITask[]> = await TasksService.getAllTask(searchParams);
                setTasks(res.data);
            } catch (e) {
                console.error(e, "Ошибка запроса задач");
            }
        };

        fetchTasks();
    }, [searchParams, selectedTask]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await UserService.fetchUsers();
                setUsers(res.data)
                const usersMap = res.data.reduce((acc: { [key: string]: IUser }, user: IUser) => {
                    acc[user.id] = user;
                    return acc;
                }, {});
                setUsersData(usersMap);
            } catch (e) {
                console.error(e, "Ошибка запроса пользователей");
            }
        };
        fetchUsers();
    }, [tasks]);


    return (
        <Container sx={{ mt: 12 }}>
            <GroupingForm setGrouping={setGrouping} />
            <Grid container spacing={1} sx={{ mt: 4 }}>
                {tasks.length > 0
                    ? tasks.map((task: ITask) => (
                        <Grid item xs={12} sm={6} md={4} key={task.id} onClick={() => handleOpen(task)}>
                            <Paper elevation={3} style={{ padding: 16, cursor: 'pointer' }}>
                                <Typography variant="h6" style={{ color: getStatusColor(task.status, task.due_date) }}>
                                    {task.title}
                                </Typography>
                                <Typography variant="body2">Приоритет: {task.priority}</Typography>
                                <Typography variant="body2">Дата окончания: {task.due_date.split("T")[0]}</Typography>
                                <Typography variant="body2">Статус: {task.status}</Typography>
                                <Typography variant="body2">
                                    Ответственный: {usersData[task.assigneeId]
                                    ? `${usersData[task.assigneeId].firstName} ${usersData[task.assigneeId].lastName}`
                                    : "Загрузка..."}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))
                    : <Typography> У вас нет задач </Typography>}
                <TaskModal
                    open={open}
                    handleClose={handleClose}
                    taskData={selectedTask}
                    setTaskData={setSelectedTask}
                    handleChange={handleChangeUpdate}
                    handleSubmitCreate={() => {}}
                    handleSubmitUpdate={handleSubmitUpdate}
                    users={users}
                    isValid={isValid}
                    editingTask={selectedTask}
                />
            </Grid>
        </Container>
    );
};

export default TasksGrid;

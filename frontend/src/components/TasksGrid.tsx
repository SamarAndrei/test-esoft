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

const TasksGrid = () => {
    const [grouping, setGrouping] = useState("");
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [users, setUsers] = useState<{ [id: string]: { firstName: string, lastName: string } }>({});
    const [openModal, setOpenModal] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedTask, setSelectedTask] = useState<ITask | null>(null);

    const handleOpenModal = (task: ITask) => {
        setSelectedTask(task);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedTask(null);
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
    }, [searchParams]);

    const getUserName = async (id: string) => {
        try {
            const res = await UserService.fetchUserById(id);
            return { firstName: res.data.firstName, lastName: res.data.lastName };
        } catch (e) {
            console.error(e, "Ошибка запроса пользователей");
        }
    };

    useEffect(() => {
        const fetchUserNames = async () => {
            const usersData: { [id: string]: { firstName: string, lastName: string } } = {};

            for (const task of tasks) {
                if (!usersData[task.assigneeId]) {
                    const userName = await getUserName(task.assigneeId);
                    if (userName) {
                        usersData[task.assigneeId] = userName;
                    }
                }
            }

            setUsers((prevUsers) => ({ ...prevUsers, ...usersData }));
        };

        if (tasks.length > 0) {
            fetchUserNames();
        }
    }, [tasks]);

    return (
        <Container sx={{ mt: 12 }}>
            <GroupingForm setGrouping={setGrouping} />
            <Grid container spacing={1} sx={{ mt: 4 }}>
                {tasks.length > 0
                    ? tasks.map((task: ITask) => (
                        <Grid item xs={12} sm={6} md={4} key={task.id} onClick={() => handleOpenModal(task)}>
                            <Paper elevation={3} style={{ padding: 16, cursor: 'pointer' }}>
                                <Typography variant="h6" style={{ color: getStatusColor(task.status, task.due_date) }}>
                                    {task.title}
                                </Typography>
                                <Typography variant="body2">Приоритет: {task.priority}</Typography>
                                <Typography variant="body2">Дата окончания: {task.due_date.split("T")[0]}</Typography>
                                <Typography variant="body2">Статус: {task.status}</Typography>
                                <Typography variant="body2">
                                    Ответственный: {users[task.assigneeId] ? `${users[task.assigneeId].firstName} ${users[task.assigneeId].lastName}` : "Загрузка..."}
                                </Typography>
                            </Paper>
                        </Grid>
                    ))
                    : <Typography> У вас нет задач </Typography>}
                <TaskModal
                    openModal={openModal}
                    handleCloseModal={handleCloseModal}
                    selectedTask={selectedTask}
                    users={users}
                />
            </Grid>
        </Container>
    );
};

export default TasksGrid;

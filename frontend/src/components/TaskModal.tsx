import React from 'react';
import { Box, Button, Modal, Typography } from "@mui/material";
import { ITask } from "../models/ITask.ts";

interface TaskModalProps {
    openModal: boolean;
    handleCloseModal: () => void;
    selectedTask: ITask | null;
    users: { [id: string]: { firstName: string, lastName: string } };
}

const TaskModal: React.FC<TaskModalProps> = ({ openModal, handleCloseModal, selectedTask, users }) => {
    return (
        <Modal open={openModal} onClose={handleCloseModal}>
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "white",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                }}
            >
                {selectedTask && (
                    <>
                        <Typography variant="h6" gutterBottom>
                            Задача: {selectedTask.title}
                        </Typography>
                        <Typography variant="body2">Приоритет: {selectedTask.priority}</Typography>
                        <Typography variant="body2">Дата окончания: {selectedTask.due_date.split("T")[0]}</Typography>
                        <Typography variant="body2">Статус: {selectedTask.status}</Typography>
                        <Typography variant="body2">
                            Ответственный: {users[selectedTask.assigneeId] ? `${users[selectedTask.assigneeId].firstName} ${users[selectedTask.assigneeId].lastName}` : "Загрузка..."}
                        </Typography>
                        <Button fullWidth variant="contained" color="primary" onClick={handleCloseModal} sx={{ mt: 2 }}>
                            Закрыть
                        </Button>
                    </>
                )}
            </Box>
        </Modal>
    );
};

export default TaskModal;

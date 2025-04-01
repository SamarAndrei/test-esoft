import { useState, useEffect } from 'react';

const useValidateCreateTaskData = ({
                                       title,
                                       description,
                                       priority,
                                       due_date,
                                       status,
                                       assigneeId
                                   }: {
    title: string;
    description?: string;
    priority: string;
    due_date: string;
    status: string;
    assigneeId: string;
}) => {
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        const newErrors: { [key: string]: string } = {};
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (!title || title.length > 255) {
            newErrors.title = 'Заголовок задачи обязателен и не должен превышать 255 символов';
        }

        if (description!.length > 1000) {
            newErrors.description = 'Описание задачи не должно превышать 1000 символов';
        }

         if (new Date(due_date) < today) {
            newErrors.due_date = 'Дата окончания не может быть меньше сегодняшней';
        }

        if (!['высокий', 'средний', 'низкий'].includes(priority)) {
            newErrors.priority = 'Приоритет должен быть одним из: высокий, средний, низкий';
        }

        if (!['к выполнению', 'выполняется', 'выполнена', 'отменена'].includes(status)) {
            newErrors.status = 'Статус должен быть одним из: к выполнению, выполняется, выполнена, отменена';
        }

        if (!assigneeId) {
            newErrors.assigneeId = 'Ответственного обязательно';
        }

        setErrors(newErrors);
        setIsValid(Object.keys(newErrors).length === 0); // проверка на валидность
    }, [title, description, priority, due_date, status, assigneeId]);

    return {
        errors,
        isValid
    };
};

export default useValidateCreateTaskData;

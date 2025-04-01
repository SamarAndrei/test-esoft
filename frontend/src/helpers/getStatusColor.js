export const getStatusColor = (status, dueDate) => {
    const today = new Date().toISOString().split('T')[0];
    dueDate = dueDate.split('T')[0];
    if (status === 'выполнена')
        return 'green';
    if (new Date(dueDate) < new Date(today))
        return 'red';
    return 'gray';
};

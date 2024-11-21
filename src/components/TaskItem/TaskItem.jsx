import React from 'react';

const TaskItem = ({ task, fetchTasks }) => {
    const handleComplete = async () => {
        try {
            await fetch(`http://localhost:5000/tasks/${task._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ isCompleted: !task.isCompleted }),
            });
            fetchTasks(); // Перезагружаем задачи
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await fetch(`http://localhost:5000/tasks/${task._id}`, {
                method: 'DELETE',
            });
            fetchTasks(); // Перезагружаем задачи
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <li style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}>
            {task.text} — {task.category} - {task.createdAt}
            <button onClick={handleComplete}>
                {task.isCompleted ? 'Undo' : 'Complete'}
            </button>
            <button onClick={handleDelete}>Delete</button>
        </li>
    );
};

export default TaskItem;

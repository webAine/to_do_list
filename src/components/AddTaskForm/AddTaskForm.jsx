import React, { useState } from 'react';

const AddTaskForm = ({ fetchTasks }) => {
    const [text, setText] = useState('');
    const [category, setCategory] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!text || !category) return; // Пустые поля не отправляем

        try {
            const response = await fetch('http://localhost:5000/tasks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text, category }),
            });

            if (!response.ok) {
                throw new Error('Error adding task');
            }

            const newTask = await response.json(); // Получаем добавленную задачу

            setText('');
            setCategory('');
            fetchTasks(); // Перезагружаем задачи с сервера
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Task description"
            />
            <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Category"
            />
            <button type="submit">Add Task</button>
        </form>
    );
};

export default AddTaskForm;

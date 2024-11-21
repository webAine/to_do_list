import React, { useState, useEffect } from 'react';
import TaskItem from './../TaskItem/TaskItem';

const TaskList = ({ tasks, fetchTasks, loading }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState(['all']);

  // Динамическое создание категорий после получения задач
  useEffect(() => {
    if (tasks.length > 0) {
      const uniqueCategories = [
        ...new Set(tasks.map(task => task.category)),
      ];
      setCategories(['all', ...uniqueCategories]);
    }
  }, [tasks]); // Этот эффект сработает каждый раз, когда tasks обновятся

  // Фильтрация задач по выбранной категории
  const filteredTasks = tasks.filter(task => {
    if (selectedCategory === 'all') return true;
    return task.category === selectedCategory;
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Tasks</h2>
      <div>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{
              backgroundColor: selectedCategory === category ? 'lightgray' : 'white',
            }}
          >
            {category === 'all' ? 'Все' : category}
          </button>
        ))}
      </div>
      <ul>
        {filteredTasks.map(task => (
          <TaskItem key={task._id} task={task} fetchTasks={fetchTasks} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;

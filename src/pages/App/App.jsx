import React, { useEffect, useState } from "react";
import AddTaskForm from "../../components/AddTaskForm/AddTaskForm";
import TaskList from "../../components/TaskList/TaskList";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch("http://localhost:5000");
        const data = await response.text();
        console.log(data);
      } catch (error) {
        console.error("Error connecting to server:", error);
      }
    };

    fetchTask();
  }, []);

  // Получение задач с сервера
  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:5000/tasks");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setTasks(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks(); // Загружаем задачи при монтировании компонента
  }, []);

  return (
    <div>
      <h1>Todo List</h1>
      <AddTaskForm fetchTasks={fetchTasks} />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <TaskList tasks={tasks} fetchTasks={fetchTasks} />
      )}
    </div>
  );
};

export default App;

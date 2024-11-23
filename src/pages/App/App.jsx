import React, { useEffect, useState } from "react";
import "./App.css";
import AddTaskForm from "../../components/AddTaskForm/AddTaskForm";
import TaskList from "../../components/TaskList/TaskList";
import Categories from "../../components/Categories/Categories";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");

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
    <>
      <Header />
      <div className="container">
        <div className="toDoList">
          <Categories
            tasks={tasks}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <AddTaskForm fetchTasks={fetchTasks} />
          {loading ? (
            <div>Loading...</div>
          ) : (
            <TaskList
              tasks={tasks}
              fetchTasks={fetchTasks}
              selectedCategory={selectedCategory}
            />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default App;

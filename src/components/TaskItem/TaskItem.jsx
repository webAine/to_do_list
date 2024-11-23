import React from "react";
import styles from "./TaskItem.module.css";

const TaskItem = ({ task, fetchTasks }) => {
  const handleComplete = async () => {
    try {
      await fetch(`http://localhost:5000/tasks/${task._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isCompleted: true }),
      });
      fetchTasks(); // Перезагрузить задачи
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:5000/tasks/${task._id}`, {
        method: "DELETE",
      });
      fetchTasks(); // Перезагружаем задачи
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <li
      className={styles.tasksItem}
      style={{ textDecoration: task.isCompleted ? "line-through" : "none" }}
    >
      <span className={styles.tasksItemCategory}>{task.category}</span>
      <div className={styles.tasksItemInfo}>
        <span>{task.text}</span>
          <span>{task.createdAt.split("T")[0].replaceAll('-', '.')}</span>
          {task.deadline && <span>Deadline: {new Date(task.deadline).toLocaleDateString()}</span>}
        {!task.isCompleted && (
          <button onClick={handleComplete}>Mark as Completed</button>
        )}
        <button onClick={handleDelete}>Delete</button>
      </div>
    </li>
  );
};

export default TaskItem;

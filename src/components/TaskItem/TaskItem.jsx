import React, { useState } from "react";
import styles from "./TaskItem.module.css";

const TaskItem = ({ task, fetchTasks }) => {
  const [color, setColor] = useState(task.color || "#eee"); // Текущий цвет задачи
  const [isEditing, setIsEditing] = useState(false); // Статус редактирования
  const [editedText, setEditedText] = useState(task.text); // Текст для редактирования

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

  const handleColorChange = async (newColor) => {
    setColor(newColor); // Локально меняем цвет
    try {
      await fetch(`http://localhost:5000/tasks/${task._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ color: newColor }), // Отправляем новый цвет на сервер
      });
      fetchTasks(); // Перезагрузить задачи
    } catch (error) {
      console.error("Error updating color:", error);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing); // Переключаем режим редактирования
  };

  const handleTextChange = (e) => {
    setEditedText(e.target.value); // Локально меняем текст
  };

  const handleSaveText = async () => {
    try {
      await fetch(`http://localhost:5000/tasks/${task._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: editedText }), // Отправляем обновленный текст на сервер
      });
      setIsEditing(false); // Выключаем режим редактирования
      fetchTasks(); // Перезагружаем задачи
    } catch (error) {
      console.error("Error updating text:", error);
    }
  };

  return (
    <li
      className={styles.tasksItem}
      style={{
        textDecoration: task.isCompleted ? "line-through" : "none",
      }}
    >
      <span
        className={styles.tasksItemCategory}
        style={{ backgroundColor: color }}
      >
        {task.category}
      </span>
      <div className={styles.tasksItemInfo}>
        {isEditing ? (
          <>
            <input
              type="text"
              value={editedText}
              onChange={handleTextChange}
              placeholder="Edit task text"
            />
          </>
        ) : (
          <>
            <span>{task.text}</span>
          </>
        )}
        <span>{task.createdAt.split("T")[0].replaceAll("-", ".")}</span>
        {task.deadline && (
          <span>Deadline: {new Date(task.deadline).toLocaleDateString()}</span>
        )}
        {!task.isCompleted && (
          <button onClick={handleComplete}>Mark as Completed</button>
        )}
        <button onClick={handleDelete}>Delete</button>
        <label>
          Change Color:
          <input
            type="color"
            value={color}
            onChange={(e) => handleColorChange(e.target.value)}
          />
        </label>
      </div>

      {!isEditing ? (
        <button onClick={handleEditToggle}>Edit</button>
      ) : (
        <button onClick={handleSaveText}>Save</button>
      )}
    </li>
  );
};

export default TaskItem;

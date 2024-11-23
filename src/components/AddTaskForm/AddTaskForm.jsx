import React, { useState } from "react";
import styles from "./AddTaskForm.module.css";

const AddTaskForm = ({ fetchTasks }) => {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!text || !category) return;

    try {
      await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, category, deadline }),
      });
      setText("");
      setCategory("");
      setDeadline("");
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  return (
    <form className={styles.taskForm} onSubmit={handleSubmit}>
      <div className={styles.taskFormWrapper}>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category"
        />
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Task description"
        />
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          placeholder="Deadline"
        />
        <button type="submit">Add Task</button>
      </div>
    </form>
  );
};

export default AddTaskForm;

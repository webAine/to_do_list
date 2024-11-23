import TaskItem from "./../TaskItem/TaskItem";
import styles from "./TaskList.module.css";

const TaskList = ({ tasks, fetchTasks, loading, selectedCategory }) => {
  // Фильтрация задач по выбранной категории
  const filteredTasks = tasks
    .filter((task) => {
      if (selectedCategory === "all") return !task.isCompleted;
      if (selectedCategory === "completed") return task.isCompleted;
      return task.category === selectedCategory && !task.isCompleted;
    })
    .sort((a, b) => {
      if (!a.deadline) return 1; // Задачи без дедлайна идут последними
      if (!b.deadline) return -1;
      return new Date(a.deadline) - new Date(b.deadline);
    });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.tasks}>
      <h2>Tasks</h2>
      <ul className={styles.tasksList}>
        {filteredTasks.map((task) => (
          <TaskItem key={task._id} task={task} fetchTasks={fetchTasks} />
        ))}
      </ul>
    </div>
  );
};

export default TaskList;

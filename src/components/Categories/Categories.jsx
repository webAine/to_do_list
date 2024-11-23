import React, { useEffect, useState } from "react";
import styles from "./Categories.module.css";

const Categories = ({ tasks, selectedCategory, setSelectedCategory }) => {
  const [categories, setCategories] = useState(["all", "completed"]); // Добавляем "completed" как категорию по умолчанию

  // Динамическое создание категорий после получения задач
  useEffect(() => {
    if (tasks.length > 0) {
      const uniqueCategories = [...new Set(tasks.map((task) => task.category))];
      setCategories(["all", "completed", ...uniqueCategories]); // Включаем "completed" в список категорий
    }
  }, [tasks]); // Этот эффект сработает каждый раз, когда tasks обновятся

  return (
    <div className={styles.categories}>
      <div className={styles.categoriesWrapper}>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            style={{
              scale:
                selectedCategory === category ? "1.1" : "1",
                background: selectedCategory === category && "red"
            }}
          >
            {category === "all"
              ? "Все"
              : category === "completed"
              ? "Завершенные"
              : category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Categories;

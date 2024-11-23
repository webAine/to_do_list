const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Task = require("./models/Task");

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;

// Подключение к MongoDB
const connectToDatabase = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://aine:QazWsxEdc1324576890@cluster0.wg9m9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

connectToDatabase();

app.get("/", async (req, res) => {
  try {
    res.send("Hello from server!");
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).send("Server error");
  }
});

// Получение всех задач
app.get("/tasks", async (req, res) => {
  try {
    const { category } = req.query; // Получаем параметр категории из запроса
    let tasks;

    if (category && category !== "all") {
      tasks = await Task.find({ category }); // Если категория передана, фильтруем по ней
    } else {
      tasks = await Task.find(); // Если нет категории, возвращаем все задачи
    }

    res.json(tasks); // Отправляем задачи в формате JSON
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ message: "Error fetching tasks" });
  }
});

// Добавление новой задачи
app.post("/tasks", async (req, res) => {
  try {
    const { text, category, deadline } = req.body; // Добавили deadline
    const newTask = new Task({ text, category, deadline });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding task");
  }
});

// Обновление задачи
app.put("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body; // Данные из запроса
    const updatedTask = await Task.findByIdAndUpdate(id, updateData, {
      new: true, // Возвращать обновлённый объект
    });
    res.json(updatedTask); // Возвращаем обновлённую задачу
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).send("Error updating task");
  }
});

// Удаление задачи
app.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id); // Удаляем задачу по ID
    res.status(204).send(); // Успешный ответ без данных
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting task");
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

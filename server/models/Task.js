const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    text: { type: String, required: true },       // Текст задачи
    category: { type: String, required: true },  // Категория задачи
    isCompleted: { type: Boolean, default: false }, // Выполнена или нет
    createdAt: { type: Date, default: Date.now },    // Дата создания
    deadline: { type: Date }  // Дедлайн задачи
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;

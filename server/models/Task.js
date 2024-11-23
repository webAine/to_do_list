const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    text: { type: String, required: true },
    category: { type: String, required: true },
    isCompleted: { type: Boolean, default: false },
    color: { type: String, default: "#eeeeee" }, // Поле для цвета
    createdAt: { type: Date, default: Date.now },
    deadline: { type: Date },
  });

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;

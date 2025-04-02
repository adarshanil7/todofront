import { useState } from "react";
import { FaTrash, FaEdit, FaCheckCircle, FaRegCircle } from "react-icons/fa";

export default function TaskList({ tasks, toggleTask, editTask, deleteTask }) {
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const startEditing = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = (id) => {
    editTask(id, editText);
    setEditingId(null);
  };

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task._id}
          className={`group flex items-center p-5 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 ${
            task.completed ? "bg-gray-50/80" : ""
          }`}
        >
          <button
            className={`flex-shrink-0 mr-4 focus:outline-none transition-all duration-300 transform hover:scale-110 ${
              task.completed ? "text-indigo-500" : "text-gray-400 hover:text-indigo-500"
            }`}
            onClick={() => toggleTask(task._id, task.completed)}
          >
            {task.completed ? <FaCheckCircle size={24} /> : <FaRegCircle size={24} />}
          </button>

          {editingId === task._id ? (
            <input
              type="text"
              className="flex-1 p-3 bg-white/90 border-2 border-indigo-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-200 shadow-inner"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              autoFocus
            />
          ) : (
            <span
              className={`flex-1 text-gray-700 text-lg font-medium ${
                task.completed ? "line-through text-gray-400" : ""
              }`}
            >
              {task.text}
            </span>
          )}

          <div className="flex items-center space-x-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
            {editingId === task._id ? (
              <button
                className="p-2.5 text-indigo-500 hover:text-indigo-600 focus:outline-none rounded-xl hover:bg-indigo-50 transition-all duration-200 transform hover:scale-105"
                onClick={() => saveEdit(task._id)}
              >
                <FaCheckCircle size={20} />
              </button>
            ) : (
              <button
                className="p-2.5 text-indigo-500 hover:text-indigo-600 focus:outline-none rounded-xl hover:bg-indigo-50 transition-all duration-200 transform hover:scale-105"
                onClick={() => startEditing(task._id, task.text)}
              >
                <FaEdit size={20} />
              </button>
            )}
            <button
              className="p-2.5 text-rose-500 hover:text-rose-600 focus:outline-none rounded-xl hover:bg-rose-50 transition-all duration-200 transform hover:scale-105"
              onClick={() => deleteTask(task._id)}
            >
              <FaTrash size={20} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

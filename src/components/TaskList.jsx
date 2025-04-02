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
    <div className="space-y-3">
      {tasks.map((task) => (
        <div
          key={task._id}
          className={`group flex items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 ${
            task.completed ? "bg-gray-50" : ""
          }`}
        >
          <button
            className={`flex-shrink-0 mr-3 focus:outline-none transition-colors duration-200 ${
              task.completed ? "text-green-500" : "text-gray-400 hover:text-green-500"
            }`}
            onClick={() => toggleTask(task._id, task.completed)}
          >
            {task.completed ? <FaCheckCircle size={20} /> : <FaRegCircle size={20} />}
          </button>

          {editingId === task._id ? (
            <input
              type="text"
              className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              autoFocus
            />
          ) : (
            <span
              className={`flex-1 text-gray-800 ${
                task.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {task.text}
            </span>
          )}

          <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {editingId === task._id ? (
              <button
                className="p-2 text-green-500 hover:text-green-600 focus:outline-none"
                onClick={() => saveEdit(task._id)}
              >
                <FaCheckCircle size={18} />
              </button>
            ) : (
              <button
                className="p-2 text-blue-500 hover:text-blue-600 focus:outline-none"
                onClick={() => startEditing(task._id, task.text)}
              >
                <FaEdit size={18} />
              </button>
            )}
            <button
              className="p-2 text-red-500 hover:text-red-600 focus:outline-none"
              onClick={() => deleteTask(task._id)}
            >
              <FaTrash size={18} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

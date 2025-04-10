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
    <div className="mt-4">
      {tasks.map((task) => (
        <div
          key={task._id}
          className={`d-flex align-items-center p-3 mb-3 bg-white rounded shadow-sm ${
            task.completed ? "bg-light" : ""
          }`}
        >
          <button
            className={`btn btn-sm me-3 ${
              task.completed ? "text-success" : "text-secondary"
            }`}
            onClick={() => toggleTask(task._id, task.completed)}
          >
            {task.completed ? <FaCheckCircle size={20} /> : <FaRegCircle size={20} />}
          </button>

          {editingId === task._id ? (
            <input
              type="text"
              className="form-control me-3"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              autoFocus
            />
          ) : (
            <span
              className={`flex-grow-1 ${
                task.completed ? "text-decoration-line-through text-muted" : ""
              }`}
            >
              {task.text}
            </span>
          )}

          <div className="d-flex gap-2">
            {editingId === task._id ? (
              <button
                className="btn btn-success btn-sm"
                onClick={() => saveEdit(task._id)}
              >
                <FaCheckCircle size={16} />
              </button>
            ) : (
              <button
                className="btn btn-primary btn-sm"
                onClick={() => startEditing(task._id, task.text)}
              >
                <FaEdit size={16} />
              </button>
            )}
            <button
              className="btn btn-danger btn-sm"
              onClick={() => deleteTask(task._id)}
            >
              <FaTrash size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

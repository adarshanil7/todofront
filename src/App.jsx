import { useState, useEffect } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";

const API_URL = "https://todo-backend-ffe6.onrender.com/tasks";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch tasks from backend
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Failed to fetch tasks');
      const data = await res.json();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  // Add task
  const addTask = async (text) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) throw new Error('Failed to add task');
      const newTask = await res.json();
      setTasks([...tasks, newTask]);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error adding task:', err);
    }
  };

  // Toggle task completion
  const toggleTask = async (id, completed) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !completed }),
      });
      if (!res.ok) throw new Error('Failed to update task');
      const updatedTask = await res.json();
      setTasks(tasks.map(task => task._id === id ? updatedTask : task));
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error updating task:', err);
    }
  };

  // Edit task
  const editTask = async (id, text) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) throw new Error('Failed to update task');
      const updatedTask = await res.json();
      setTasks(tasks.map(task => task._id === id ? updatedTask : task));
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error updating task:', err);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error('Failed to delete task');
      setTasks(tasks.filter(task => task._id !== id));
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error deleting task:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-blue-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-8">
            <h1 className="text-3xl font-bold text-white text-center mb-2">Todo List</h1>
            <p className="text-white/80 text-center">Stay organized and productive</p>
          </div>

          {/* Main Content */}
          <div className="p-6">
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Task Input */}
            <div className="mb-6">
              <TaskInput addTask={addTask} />
            </div>

            {/* Task List */}
            <div className="space-y-4">
              <TaskList tasks={tasks} toggleTask={toggleTask} editTask={editTask} deleteTask={deleteTask} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

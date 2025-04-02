import { useState } from "react";
import { FaPlus } from "react-icons/fa";

export default function TaskInput({ addTask }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      addTask(text.trim());
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
        className="w-full px-4 py-3 pl-12 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
      />
      <button
        type="submit"
        className={`absolute left-3 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-colors duration-200 ${
          text.trim()
            ? "text-purple-500 hover:text-purple-600"
            : "text-gray-400 cursor-not-allowed"
        }`}
        disabled={!text.trim()}
      >
        <FaPlus size={18} />
      </button>
    </form>
  );
}

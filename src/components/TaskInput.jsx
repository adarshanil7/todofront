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
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="input-group">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
          className="form-control"
        />
        <button
          type="submit"
          className="btn btn-primary"
          disabled={!text.trim()}
        >
          <FaPlus />
        </button>
      </div>
    </form>
  );
}

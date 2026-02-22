"use client";

import { useState } from "react";

interface TaskFormProps {
  onAdd: (title: string, description?: string) => void;
}

export default function TaskForm({ onAdd }: TaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = () => {
    if (!title.trim()) return;

    onAdd(title, description);
    setTitle("");
    setDescription("");
  };

  return (
    <div className="bg-white border border-neutral-200 rounded-xl shadow-sm p-6 mb-6">

      <h2 className="text-lg font-semibold text-neutral-900 mb-5">
        Add New Task
      </h2>

      <div className="space-y-5">

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Title
          </label>
          <input
            type="text"
            placeholder="Enter task title"
            className="w-full border border-neutral-300 p-3 rounded-lg text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-neutral-700 mb-1">
            Description
          </label>
          <textarea
            rows={3}
            placeholder="Enter task description (optional)"
            className="w-full border border-neutral-300 p-3 rounded-lg text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition"
        >
          Add Task
        </button>
      </div>
    </div>
  );
}
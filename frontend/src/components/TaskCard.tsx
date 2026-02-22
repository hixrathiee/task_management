"use client";

import { useState } from "react";
import { Task, updateTask } from "@/lib/task";

interface TaskCardProps {
    task: Task;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onRefresh: () => void;
}

export default function TaskCard({
    task,
    onToggle,
    onDelete,
    onRefresh,
}: TaskCardProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description || "");

    const handleSave = async () => {
        const trimmedTitle = title.trim();

        if (!trimmedTitle) return;

        await updateTask(task.id, {
            title: trimmedTitle,
            description: description.trim(),
        });

        setIsEditing(false);
        onRefresh();
    };

    return (
        <div className="bg-white border border-neutral-200 rounded-xl shadow-sm p-5 flex justify-between gap-4">

            <div className="flex-1">

                {isEditing ? (
                    <>
                        <input
                            className="w-full border border-neutral-300 p-2 rounded mb-2 text-neutral-900 placeholder-neutral-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <textarea
                            className="w-full border border-neutral-300 p-2 rounded text-neutral-900 placeholder-neutral-400 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </>
                ) : (
                    <>
                        <h3 className="text-lg font-semibold text-neutral-900">
                            {task.title}
                        </h3>

                        {task.description && (
                            <p className="text-sm text-neutral-500 mt-1">
                                {task.description}
                            </p>
                        )}
                    </>
                )}

                <span
                    className={`inline-block mt-3 text-xs font-medium px-3 py-1 rounded-full ${task.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                        }`}
                >
                    {task.status}
                </span>
            </div>

            <div className="flex gap-3 items-start">

                {isEditing ? (
                    <>
                        <button
                            onClick={handleSave}
                            disabled={!title.trim()}
                            className={`px-4 py-2 rounded-lg text-sm transition ${title.trim()
                                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                                    : "bg-neutral-300 text-neutral-500 cursor-not-allowed"
                                }`}
                        >
                            Save
                        </button>

                        <button
                            onClick={() => setIsEditing(false)}
                            className="bg-neutral-300 hover:bg-neutral-400 text-neutral-700 px-4 py-2 rounded-lg text-sm"
                        >
                            Cancel
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-neutral-200 hover:bg-neutral-300 text-neutral-800 px-4 py-2 rounded-lg text-sm"
                        >
                            Edit
                        </button>

                        <button
                            onClick={() => onToggle(task.id)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
                        >
                            Toggle
                        </button>

                        <button
                            onClick={() => onDelete(task.id)}
                            className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-lg text-sm"
                        >
                            Delete
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
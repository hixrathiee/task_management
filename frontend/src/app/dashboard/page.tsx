"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import TaskForm from "@/components/TaskForm";
import TaskCard from "@/components/TaskCard";
import {
  getTasks,
  createTask,
  toggleTask,
  deleteTask,
  Task,
} from "@/lib/task";
import toast from "react-hot-toast";

export default function DashboardPage() {
  const router = useRouter();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [total, setTotal] = useState(0);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const data = await getTasks(page, limit, search, status);
      setTasks(data.tasks);
      setTotal(data.total);
    } catch {
      toast.error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [page, search, status]);

  const handleAdd = async (title: string, description?: string) => {
    try {
      const trimmedTitle = title.trim();
      const trimmedDescription = description?.trim();

      if (!trimmedTitle) {
        toast.error("Title cannot be empty");
        return;
      }

      await createTask(trimmedTitle, trimmedDescription);
      toast.success("Task added successfully");
      setShowForm(false);
      fetchTasks();
    } catch {
      toast.error("Failed to add task");
    }
  };

  const handleToggle = async (id: string) => {
    try {
      await toggleTask(id);
      fetchTasks();
    } catch {
      toast.error("Failed to update task");
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) return;

    try {
      await deleteTask(id);
      toast.success("Task deleted successfully");
      fetchTasks();
    } catch {
      toast.error("Failed to delete task");
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="min-h-screen bg-neutral-100">
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* Search + Filter */}
        <div className="bg-white border border-neutral-200 rounded-xl shadow-sm p-5 mb-6 flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search tasks..."
            className="flex-1 border border-neutral-300 p-3 rounded-lg text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
          />

          <select
            className="border border-neutral-300 p-3 rounded-lg text-neutral-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            value={status}
            onChange={(e) => {
              setPage(1);
              setStatus(e.target.value);
            }}
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Add Task Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition"
          >
            {showForm ? "Cancel" : "+ Add New Task"}
          </button>

          {showForm && (
            <div className="mt-4">
              <TaskForm onAdd={handleAdd} />
            </div>
          )}
        </div>

        {/* Task List */}
        {loading ? (
          <div className="text-center py-10 text-neutral-500">
            Loading tasks...
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-12 bg-white border border-neutral-200 rounded-xl shadow-sm">
            <p className="text-neutral-600 font-medium">
              You haven’t created any tasks yet.
            </p>
            <p className="text-sm text-neutral-400 mt-1">
              Click “Add New Task” to get started.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggle={handleToggle}
                onDelete={handleDelete}
                onRefresh={fetchTasks}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="px-5 py-2 rounded-lg bg-neutral-200 hover:bg-neutral-300 text-neutral-700 transition disabled:opacity-50"
            >
              Previous
            </button>

            <span className="text-neutral-700 font-medium">
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((prev) => prev + 1)}
              className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
import { useState } from "react";
import { Task } from "../context/TaskContext";

interface TaskModalProps {
  onClose: () => void;
  onSave: (task: Task) => void;
  task?: Task | null;
}

const TaskModal = ({ onClose, onSave, task }: TaskModalProps) => {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [priority, setPriority] = useState<Task["priority"]>(
    task?.priority || "medium"
  );

  const handleSave = () => {
    const newTask: Task = {
      id: task?.id || `${Date.now()}-${Math.floor(Math.random() * 10000)}`,
      title,
      description,
      priority,
      status: "todo",
    };
    onSave(newTask);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 text-white">
        <h2 className="text-2xl font-bold mb-6">
          {task ? "View/Edit Task" : "Add New Task"}
        </h2>

        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task Title"
          className="w-full p-3 mb-4 bg-gray-700 border-none rounded-lg text-white"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Task Description"
          className="w-full p-3 mb-4 bg-gray-700 border-none rounded-lg text-white"
          rows={4}
        />

        <label className="block mb-2 font-semibold">Priority:</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as Task["priority"])}
          className="w-full p-3 mb-4 bg-gray-700 border-none rounded-lg text-white"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mr-3 px-5 py-2 bg-gray-500 rounded-lg text-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;

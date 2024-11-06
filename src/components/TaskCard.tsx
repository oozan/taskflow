import { Task } from "../context/TaskContext";
import { useTaskContext } from "../context/TaskContext";
import { FaTrash } from "react-icons/fa";

interface TaskCardProps {
  task: Task;
}

const TaskCard = ({ task }: TaskCardProps) => {
  const { deleteTask } = useTaskContext();

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text/plain", task.id);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteTask(task.id);
  };

  return (
    <div
      className="p-4 bg-gray-700 rounded-lg shadow-lg hover:shadow-xl mb-2 transition-all duration-300 transform hover:scale-105 cursor-pointer"
      draggable
      onDragStart={handleDragStart}
    >
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-white truncate">{task.title}</h3>
        <button
          onClick={handleDelete}
          className="text-red-500 hover:text-red-600"
        >
          <FaTrash size={16} />
        </button>
      </div>
      <p className="text-sm text-gray-300 truncate overflow-hidden whitespace-nowrap max-w-full">
        {task.description}
      </p>
      <span
        className={`inline-block mt-2 px-2 py-1 text-xs font-bold rounded ${
          task.priority === "high"
            ? "bg-red-500 text-white"
            : task.priority === "medium"
            ? "bg-yellow-500 text-gray-900"
            : "bg-green-500 text-white"
        }`}
      >
        {task.priority.toUpperCase()}
      </span>
    </div>
  );
};

export default TaskCard;

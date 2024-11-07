import { useTaskContext, Task } from "../context/TaskContext";
import TaskCard from "../components/TaskCard";
import TaskModal from "../components/TaskModal";
import { useState, useEffect } from "react";
import Head from "next/head";

type TaskStatus = "todo" | "in-progress" | "done";

interface Columns {
  todo: Task[];
  "in-progress": Task[];
  done: Task[];
}

const TaskBoard = () => {
  const { tasks, addTask, updateTask } = useTaskContext();
  const [columns, setColumns] = useState<Columns>({
    todo: [],
    "in-progress": [],
    done: [],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  useEffect(() => {
    setColumns({
      todo: tasks.filter((task) => task.status === "todo"),
      "in-progress": tasks.filter((task) => task.status === "in-progress"),
      done: tasks.filter((task) => task.status === "done"),
    });
  }, [tasks]);

  const handleAddTaskClick = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const handleSaveTask = (task: Task) => {
    if (selectedTask) {
      updateTask(task);
    } else {
      addTask(task);
    }
  };

  const allowDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    newStatus: TaskStatus
  ) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("text/plain");
    const task = tasks.find((t) => t.id === taskId);
    if (task && task.status !== newStatus) {
      const updatedTask: Task = { ...task, status: newStatus };
      updateTask(updatedTask);
    }
  };

  return (
    <>
      <Head>
        <title>Task Board</title>
      </Head>
      <main className="p-8 min-h-screen bg-gray-900 text-white" role="main">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-bold text-blue-400">All Boards</h1>
          <button
            onClick={handleAddTaskClick}
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg shadow-lg font-semibold"
            aria-label="Add new task"
          >
            + Add Task
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(columns).map(([columnId, columnTasks]) => {
            const status = columnId as TaskStatus;
            const columnTitle =
              status === "todo"
                ? "To Do"
                : status === "in-progress"
                ? "In Progress"
                : "Done";

            return (
              <section
                key={status}
                onDragOver={(e) =>
                  allowDrop(e as React.DragEvent<HTMLDivElement>)
                }
                onDrop={(e) =>
                  handleDrop(e as React.DragEvent<HTMLDivElement>, status)
                }
                className="bg-gray-800 p-6 rounded-lg shadow-lg min-h-[300px]"
                aria-labelledby={`${status}-heading`}
              >
                <h2
                  id={`${status}-heading`}
                  className="text-lg font-semibold text-white mb-4"
                >
                  {columnTitle}
                </h2>
                <div className="space-y-4">
                  {(columnTasks as Task[]).map((task) => (
                    <div
                      key={task.id}
                      onClick={() => {
                        setSelectedTask(task);
                        setIsModalOpen(true);
                      }}
                    >
                      <TaskCard task={task} />
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {isModalOpen && (
          <TaskModal
            onClose={() => setIsModalOpen(false)}
            onSave={handleSaveTask}
            task={selectedTask}
          />
        )}
      </main>
    </>
  );
};

export default TaskBoard;

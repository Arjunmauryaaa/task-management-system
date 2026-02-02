import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function ProjectDetails() {
  const { projectId } = useParams();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Todo");
  const [priority, setPriority] = useState("Low");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      const res = await api.get(`/tasks/${projectId}`);
      setTasks(res.data);
    };
    fetchTasks();
  }, [projectId]);

  const submitTask = async (e) => {
    e.preventDefault();

    if (editingId) {
      await api.put(`/tasks/${editingId}`, { title, status, priority });
      setEditingId(null);
    } else {
      await api.post("/tasks", {
        title,
        status,
        priority,
        project: projectId,
      });
    }

    setTitle("");
    setStatus("Todo");
    setPriority("Low");

    const res = await api.get(`/tasks/${projectId}`);
    setTasks(res.data);
  };

  const editTask = (task) => {
    setEditingId(task._id);
    setTitle(task.title);
    setStatus(task.status);
    setPriority(task.priority);
  };

  const deleteTask = async (id) => {
    await api.delete(`/tasks/${id}`);
    const res = await api.get(`/tasks/${projectId}`);
    setTasks(res.data);
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <h2>Tasks</h2>

        <form className="form" onSubmit={submitTask}>
          <input
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>

          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <button type="submit">
            {editingId ? "Update Task" : "Create Task"}
          </button>
        </form>

        {tasks.map((t) => (
          <div className="card" key={t._id}>
            <div>
              <b>{t.title}</b>
              <span
                className={`tag ${
                  t.status === "Done"
                    ? "done"
                    : t.status === "In Progress"
                    ? "progress"
                    : "todo"
                }`}
              >
                {t.status}
              </span>
              <span className={`tag ${t.priority.toLowerCase()}`}>
                {t.priority}
              </span>
            </div>
            <div>
              <button className="edit" onClick={() => editTask(t)}>
                Edit
              </button>
              <button className="delete" onClick={() => deleteTask(t._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

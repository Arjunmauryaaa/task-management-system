import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const res = await api.get("/projects");
      setProjects(res.data);
    };
    fetchProjects();
  }, []);

  const submitProject = async (e) => {
    e.preventDefault();

    if (editingId) {
      await api.put(`/projects/${editingId}`, { title, description });
      setEditingId(null);
    } else {
      await api.post("/projects", { title, description });
    }

    setTitle("");
    setDescription("");

    const res = await api.get("/projects");
    setProjects(res.data);
  };

  const editProject = (project) => {
    setEditingId(project._id);
    setTitle(project.title);
    setDescription(project.description || "");
  };

  const deleteProject = async (id) => {
    await api.delete(`/projects/${id}`);
    const res = await api.get("/projects");
    setProjects(res.data);
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <h2>My Projects</h2>

        <form className="form" onSubmit={submitProject}>
          <input
            placeholder="Project title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            placeholder="Project description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button type="submit">
            {editingId ? "Update Project" : "Create Project"}
          </button>
        </form>

        {projects.map((p) => (
          <div className="card" key={p._id}>
            <Link to={`/projects/${p._id}`}>{p.title}</Link>
            <div>
              <button className="edit" onClick={() => editProject(p)}>
                Edit
              </button>
              <button className="delete" onClick={() => deleteProject(p._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

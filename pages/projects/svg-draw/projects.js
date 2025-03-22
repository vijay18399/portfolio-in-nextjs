// pages/projects.js
import { useState, useEffect } from 'react';
import styles from '../styles/Projects.module.css';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ title: '', description: '' });
  const [editingId, setEditingId] = useState(null);
  const [editingProject, setEditingProject] = useState({ title: '', description: '' });

  // Fetch projects from the API
  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      if (data.success) {
        setProjects(data.data);
      } else {
        console.error('Failed to fetch projects');
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  }

  // Create a new project
  async function handleCreateProject(e) {
    e.preventDefault();
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProject)
      });
      const data = await res.json();
      if (data.success) {
        setNewProject({ title: '', description: '' });
        fetchProjects();
      } else {
        console.error('Failed to create project');
      }
    } catch (error) {
      console.error('Error creating project:', error);
    }
  }

  // Update an existing project
  async function handleUpdateProject(e) {
    e.preventDefault();
    try {
      const res = await fetch(`/api/projects/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProject)
      });
      const data = await res.json();
      if (data.success) {
        setEditingId(null);
        setEditingProject({ title: '', description: '' });
        fetchProjects();
      } else {
        console.error('Failed to update project');
      }
    } catch (error) {
      console.error('Error updating project:', error);
    }
  }

  // Delete a project
  async function handleDeleteProject(id) {
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        fetchProjects();
      } else {
        console.error('Failed to delete project');
      }
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  }

  return (
    <div className="container}>
      <h1 className="title}>Projects</h1>

      {/* Create New Project */}
      <div className="formContainer}>
        <h2>Add New Project</h2>
        <form onSubmit={handleCreateProject} className="form}>
          <input
            type="text"
            placeholder="Title"
            value={newProject.title}
            onChange={(e) =>
              setNewProject({ ...newProject, title: e.target.value })
            }
            className="input}
            required
          />
          <textarea
            placeholder="Description"
            value={newProject.description}
            onChange={(e) =>
              setNewProject({ ...newProject, description: e.target.value })
            }
            className="textarea}
            required
          />
          <button type="submit" className="button}>
            Add Project
          </button>
        </form>
      </div>

      {/* List of Projects */}
      <div className="projectsList}>
        <h2>Existing Projects</h2>
        {projects.length === 0 && <p>No projects found.</p>}
        {projects.map((project) => (
          <div key={project._id} className="projectCard}>
            {editingId === project._id ? (
              <form onSubmit={handleUpdateProject} className="form}>
                <input
                  type="text"
                  value={editingProject.title}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      title: e.target.value
                    })
                  }
                  className="input}
                  required
                />
                <textarea
                  value={editingProject.description}
                  onChange={(e) =>
                    setEditingProject({
                      ...editingProject,
                      description: e.target.value
                    })
                  }
                  className="textarea}
                  required
                />
                <div className="actions}>
                  <button type="submit" className="button}>
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingId(null)}
                    className="buttonCancel}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="cardActions}>
                  <button
                    onClick={() => {
                      setEditingId(project._id);
                      setEditingProject({
                        title: project.title,
                        description: project.description
                      });
                    }}
                    className="buttonEdit}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProject(project._id)}
                    className="buttonDelete}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

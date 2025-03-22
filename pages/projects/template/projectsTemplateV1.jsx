const ProjectsTemplateV1 = ({ children }) => (
  <div className="projects-container">
    {children.map((project, index) => (
      <div key={index} className="project-card">
        <h3 className="project-title">
          <a href={project.link} target="_blank" rel="noopener noreferrer">{project.title}</a>
        </h3>
        <div>{project.description}</div>
        <p className="project-tools"><strong>Tools Used:</strong> {project.tools_used.join(", ")}</p>
      </div>
    ))}
  </div>
);

export default ProjectsTemplateV1;
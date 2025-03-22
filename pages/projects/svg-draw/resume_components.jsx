const EducationTemplate = ({ institution, location, degree, cgpa, duration }) => (
    <section className="education-container">
      <div>
        <h3>{degree}</h3>
        <p>{institution}, {location}</p>
      </div>
      <div>
        <p><strong>CGPA:</strong> {cgpa}</p>
        <p><strong>Duration:</strong> {duration}</p>
      </div>
    </section>
  );
  
  const ExperienceTemplate = ({ children }) => (
    <div className="experience-container">
      {children.map((exp, index) => (
        <div key={index} className="experience-card">
          <div className="experience-header">
            <h3 className="experience-position">{exp.position}</h3>
            <span className="experience-duration">{exp.duration}</span>
          </div>
          <div className="experience-company-location">
            <span className="experience-company">{exp.company}</span>
            <span className="experience-location">{exp.location}</span>
          </div>
          <p className="experience-description">{exp.description}</p>
          <ul className="experience-list">
            {exp.responsibilities.map((task, idx) => (
              <li key={idx} className="experience-list-item">{task}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
  
  const HeaderTemplate = ({ title }) => {
    if (!title) {
      return null;
    } else {
      return (
        <div className="header-container">
          <div className="header-left">
            <h2 className="header-name">{title}</h2>
          </div>
        </div>
      );
    }
  };
  
  const IntroTemplate = ({ email, mobile, portfolio, linkedin }) => (
    <div className="container">
      <div className="header">
        <h1 className="name">Vijay Reddy Medapati</h1>
        <a href={`mailto:${email}`} className="contact">{email}</a>
      </div>
      <div className="details">
        <span>Front-End Engineer</span>
        <span><strong>Mobile:</strong> {mobile}</span>
      </div>
      <div className="links">
        <a href={`http://${portfolio}`} target="_blank" rel="noopener noreferrer">
          <strong>Portfolio:</strong> {portfolio}
        </a>
        <a href={linkedin} target="_blank" rel="noopener noreferrer">
          <strong>LinkedIn:</strong> {linkedin}
        </a>
      </div>
    </div>
  );
  
  const ProjectsTemplate = ({ children }) => (
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
  
  const PublicationTemplate = ({ children }) => (
    <div className="publication-container">
      {children.map((pub, index) => (
        <div key={index} className="publication-card">
          <h3>{pub.title}</h3>
          <p><strong>Authors:</strong> {pub.authors.join(", ")}</p>
          <p><strong>Journal:</strong> {pub.journal} ({pub.date})</p>
          <p><strong>Pages:</strong> {pub.pages} | <strong>ISSN:</strong> {pub.issn}</p>
        </div>
      ))}
    </div>
  );
  
  const SkillsTemplate = ({ skills }) => (
    <div className="skills-container">
      <ul className="skills-grid">
        {skills.map((skill, index) => (
          <li key={index} className="skill-item">{skill}</li>
        ))}
      </ul>
    </div>
  );
  
  // Export all components
  export {
    EducationTemplate,
    ExperienceTemplate,
    HeaderTemplate,
    IntroTemplate,
    ProjectsTemplate,
    PublicationTemplate,
    SkillsTemplate,
  };
  
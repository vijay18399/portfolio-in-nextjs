const ExperienceTemplateV1 = ({ children }) => (
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

export default ExperienceTemplateV1;
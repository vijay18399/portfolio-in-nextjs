const SkillsTemplateV1 = ({ skills }) => (
  <div className="skills-container">
    <ul className="skills-grid">
      {skills.map((skill, index) => (
        <li key={index} className="skill-item">{skill}</li>
      ))}
    </ul>
  </div>
);

export default SkillsTemplateV1;
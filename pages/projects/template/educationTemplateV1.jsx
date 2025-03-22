const EducationTemplateV1 = ({ institution, location, degree, cgpa, duration }) => (
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

export default EducationTemplateV1;
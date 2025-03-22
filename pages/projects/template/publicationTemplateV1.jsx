const PublicationTemplateV1 = ({ children }) => (
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

export default PublicationTemplateV1;

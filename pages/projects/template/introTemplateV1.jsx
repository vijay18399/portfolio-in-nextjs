import React from 'react';

const IntroTemplateV1 = ({ email, mobile, portfolio, linkedin }) => {
  // Inline styles
  const containerStyle = {
    maxWidth: '600px',
    margin: '2rem auto',
    padding: '2rem',
    background: '#f9fafb',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
    fontFamily: '"Inter", sans-serif',
  };

  const headerStyle = {
    marginBottom: '1.5rem',
  };

  const nameStyle = {
    fontSize: '2rem',
    color: '#1a1a1a',
    margin: '0',
    fontWeight: '600',
  };

  const contactStyle = {
    display: 'inline-block',
    marginTop: '0.5rem',
    fontSize: '1rem',
    color: '#007BFF',
    textDecoration: 'none',
    transition: 'color 0.3s',
  };

  const detailsStyle = {
    margin: '1.5rem 0',
    fontSize: '1rem',
    color: '#4a4a4a',
    lineHeight: '1.6',
  };

  const linksStyle = {
    marginTop: '2rem',
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    flexWrap: 'wrap',
  };

  const linkStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '8px 16px',
    fontSize: '0.9rem',
    color: '#007BFF',
    backgroundColor: 'transparent',
    border: '1px solid #007BFF',
    borderRadius: '6px',
    textDecoration: 'none',
    transition: 'background-color 0.3s, color 0.3s',
  };

  const iconStyle = {
    width: '16px',
    height: '16px',
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={nameStyle}>Vijay Reddy Medapati</h1>
        <a href={`mailto:${email}`} style={contactStyle}>
          {email}
        </a>
      </div>
      <div style={detailsStyle}>
        <p>Front-End Engineer</p>
        <p>
          <strong>Mobile:</strong> {mobile}
        </p>
      </div>
      <div style={linksStyle}>
        <a
          href={`http://${portfolio}`}
          target="_blank"
          rel="noopener noreferrer"
          style={linkStyle}
        >
          <img
            src="https://img.icons8.com/ios-filled/50/007BFF/portfolio.png"
            alt="Portfolio"
            style={iconStyle}
          />
          <span>Portfolio</span>
        </a>
        <a
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          style={linkStyle}
        >
          <img
            src="https://img.icons8.com/ios-filled/50/007BFF/linkedin.png"
            alt="LinkedIn"
            style={iconStyle}
          />
          <span>LinkedIn</span>
        </a>
      </div>
    </div>
  );
};

export default IntroTemplateV1;
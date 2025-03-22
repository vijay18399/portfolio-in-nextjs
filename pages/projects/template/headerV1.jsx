const HeaderTemplateV1 = ({ title }) => {
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
  
  export default HeaderTemplateV1;
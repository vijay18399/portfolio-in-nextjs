import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

const StylesWrapper = ({ children }) => {
  const page = useSelector((state) => state.page.value);
  let styles = page.styles;
  useEffect(() => {
    if (styles) {
      Object.keys(styles).forEach((key) => {
          document.documentElement.style.setProperty(key, `${styles[key]}`);
      });
    }
  }, [styles]);

  return <>{children}</>;
};

export default StylesWrapper;

import React, { useState, useEffect } from "react";
import themes from '@/constants/themes';
import { init } from '@/features/page/pageSlice';
import { useSelector, useDispatch } from 'react-redux';

const StyleCustomizer = () => {
  const dispatch = useDispatch();
  
  // Get the current styles from the Redux store
  const styles = useSelector((state) => state.page.value.styles);
  
  const [currentTheme, setCurrentTheme] = useState('default');

  const applyTheme = (themeKey) => {
    const theme = themes[themeKey];
    setCurrentTheme(themeKey);
    
    // Merge the existing styles with the new theme variables
    const updatedStyles = {
      ...styles,
      ...Object.entries(theme.variables).reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {}),
    };
   console.log(updatedStyles)
    // Dispatch the updated styles to the store
    dispatch(init({ styles: updatedStyles }));
  };

  return (
    <div className="customizer-container">
      <p>Choose color themes:</p>
      <div className="theme-grid">
        {Object.entries(themes).map(([key, theme]) => (
          <div 
            key={key}
            style={{
              backgroundColor: theme.variables["--bg-banner"],
              color: 'white',
              border: `1px solid ${theme.variables["--border-color"]}`
            }}
            className={`theme-card ${currentTheme === key ? 'active' : ''}`}
            onClick={() => applyTheme(key)}
          >
            {theme.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StyleCustomizer;

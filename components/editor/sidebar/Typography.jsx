import React, { useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import { useSelector, useDispatch } from 'react-redux';
import { init } from '@/features/page/pageSlice';

// Font size labels
const typographyLabels = {
  "--font-h1": "Heading 1 (H1)",
  "--font-h2": "Heading 2 (H2)",
  "--font-h3": "Heading 3 (H3)",
  "--font-h4": "Heading 4 (H4)",
  "--font-h5": "Heading 5 (H5)",
  "--font-h6": "Heading 6 (H6)",
  "--font-p": "Paragraph (P)",
  "--font-li": "List (LI)",
};

const Typography = ({ styles, handleSliderChange }) => (
  <div className="typography-container">
    {Object.keys(typographyLabels).map((variable) => {
      console.log(styles[variable])
        let val = styles[variable].replace('px','') 
        return  <div className="input-group" key={variable}>
          <div className="label-group">
            <label>{typographyLabels[variable]}</label>
            <p> {styles[variable]}</p>
          </div>
         
          <Slider
            min={8}
            max={64}
            value={val}
            onChange={(value) => handleSliderChange(variable, value)}
          />
        </div>
        }
    )}
  </div>
);

const StyleCustomizer = () => {
  const dispatch = useDispatch();
  const styles = useSelector((state) => state.page.value.styles);

  const handleSliderChange = (variable, value) => {
    const updatedStyles = {
      ...styles,
      [variable]: value+`px`,
    };
    dispatch(init({ styles: updatedStyles }));
  };
  useEffect(() => {
    const mainElement = document.getElementById('main');
    if (mainElement) {
      mainElement.classList.add('tag-highlight'); 
    }
    return () => {
      if (mainElement) {
        mainElement.classList.remove('tag-highlight'); 
      }
    };
  }, []);
  return <Typography styles={styles} handleSliderChange={handleSliderChange} />;
};

export default StyleCustomizer;

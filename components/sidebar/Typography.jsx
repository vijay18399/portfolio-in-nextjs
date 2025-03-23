import React, { useState } from "react";
import styled from "styled-components";
import Slider from "rc-slider"; // Slider
import "rc-slider/assets/index.css"; // Slider styles

// Mapping object for user-friendly labels
const typographyLabels = {
  "--font-h1": "Heading 1 (H1)",
  "--font-h2": "Heading 2 (H2)",
  "--font-h3": "Heading 3 (H3)",
  "--font-h4": "Heading 4 (H4)",
  "--font-h5": "Heading 5 (H5)",
  "--font-h6": "Heading 6 (H6)",
  "--font-p": "Paragraph (P)",
};

const Typography = ({ styles, handleSliderChange }) => {
  // List of typography variables (font sizes for h1 to h6 and paragraph)
  const typographyVariables = Object.keys(typographyLabels);

  return (
    <TypographyContainer>
      {typographyVariables.map((variable) => {
        return (
          <InputGroup key={variable}>
            <label htmlFor={variable}>{typographyLabels[variable]}</label>
            <Slider
              min={8}
              max={64}
              value={parseInt(styles[variable], 10)}
              onChange={(value) => handleSliderChange(variable, value)}
              railStyle={{ backgroundColor: "var(--border-color)" }}
              trackStyle={{ backgroundColor: "var(--fill-primary-active)" }}
              handleStyle={{
                borderColor: "var(--fill-primary-active)",
                backgroundColor: "var(--bg-card)",
              }}
            />
          </InputGroup>
        );
      })}
    </TypographyContainer>
  );
};

const StyleCustomizer = () => {
  // Define the initial state for all CSS variables
  const [styles, setStyles] = useState({
    "--font-h1": "32px",
    "--font-h2": "24px",
    "--font-h3": "22px",
    "--font-h4": "20px",
    "--font-h5": "18px",
    "--font-h6": "16px",
    "--font-p": "16px",
    "--bg-primary": "#F0F2F5",
    "--bg-secondary": "#fff",
    "--border-color": "#e2e2e2",
    "--fill-primary-active": "#017561",
    "--bg-card": "#fff",
  });

  // Function to handle slider change for font sizes
  const handleSliderChange = (variable, value) => {
    const updatedStyles = { ...styles, [variable]: `${value}px` };
    setStyles(updatedStyles);

    // Update the CSS variable in the document root
    document.documentElement.style.setProperty(variable, `${value}px`);
  };

  return (
    <CustomizerContainer>
      <Typography styles={styles} handleSliderChange={handleSliderChange} />
    </CustomizerContainer>
  );
};

export default StyleCustomizer;

// Styled Components
const CustomizerContainer = styled.div`
  padding: 20px;
  background-color: var(--bg-secondary);
  max-width: 600px;
  height: calc(100vh - 42px);
  overflow-y: auto;
  box-shadow: var(--box-shadow-sm);
`;

const TypographyContainer = styled.div`
  background-color: var(--bg-secondary);
`;

const InputGroup = styled.div`
  margin-bottom: 15px;

  label {
    display: block;
    font-size: var(--font-p);
    color: var(--text-primary);
    margin-bottom: 10px;
    font-weight: 500;
  }

  input {
    width: 100%;
    padding: 8px;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    font-size: var(--font-p);
    color: var(--text-primary);
    background-color: var(--bg-card);
    transition: border-color 0.3s ease;

    &:focus {
      border-color: var(--fill-primary-active);
      outline: none;
    }
  }
`;
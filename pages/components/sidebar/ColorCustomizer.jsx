import React, { useState } from "react";
import styled from "styled-components";
import { MuiColorInput } from "mui-color-input";

const ColorCustomizer = ({ styles, handleColorChange }) => {
  // Mapping of color variables to user-friendly labels and predefined options
  const colorVariables = [
    {
      variable: "--bg-primary",
      label: "Primary Background",
      options: [ "#FFF3E0", "#E3F2FD", "#F5F5F5", "#FAFAFA"],
    },
    {
      variable: "--bg-secondary",
      label: "Secondary Background",
      options: [ "#ECEFF1", "#FAFAFA", "#E0F7FA", "#FFF8E1"],
    },
    {
      variable: "--bg-card",
      label: "Card Background",
      options: [  "#E0F7FA", "#F3E5F5", "#E8F5E9", "#F5F5F5"],
    },
    {
      variable: "--text-primary",
      label: "Primary Text",
      options: [ "#212121", "#000000", "#2C3E50", "#34495E"],
    },
    {
      variable: "--text-secondary",
      label: "Secondary Text",
      options: [ "#757575", "#9E9E9E", "#95A5A6", "#7F8C8D"],
    },
    {
      variable: "--button-primary-bg",
      label: "Primary Button",
      options: [  "#00695C", "#1B5E20", "#2E7D32", "#388E3C"],
    },
    {
      variable: "--button-secondary-bg",
      label: "Secondary Button",
      options: [  "#D1C4E9", "#F8BBD0", "#FFCCBC", "#FFE0B2"],
    },
  ];

  return (
    <ColorContainer>
      {colorVariables.map(({ variable, label, options }) => (
        <ColorGroup key={variable}>
          <label htmlFor={variable}>{label}</label>
          <div style={{ display: "flex", alignItems: "center" }}>
            <ColorOptions>
              {options.map((color) => (
                <ColorOption
                  key={color}
                  color={color}
                  onClick={() => handleColorChange(variable, color)}
                />
              ))}
            </ColorOptions>
            <MuiColorInput
              format="hex"
              value={styles[variable]}
              onChange={(color) => handleColorChange(variable, color)}
            />
          </div>
        </ColorGroup>
      ))}
    </ColorContainer>
  );
};

const StyleCustomizer = () => {
  // Define the initial state for all CSS variables
  const [styles, setStyles] = useState({
    "--bg-primary": "#F0F2F5",
    "--bg-secondary": "#fff",
    "--bg-card": "#fff",
    "--text-primary": "#333",
    "--text-secondary": "#777",
    "--button-primary-bg": "#017561",
    "--button-secondary-bg": "#ede8f0",
  });

  // Function to handle color change
  const handleColorChange = (variable, value) => {
    const updatedStyles = { ...styles, [variable]: value };
    setStyles(updatedStyles);

    // Update the CSS variable in the document root
    document.documentElement.style.setProperty(variable, value);
  };

  return (
    <CustomizerContainer>
      <ColorCustomizer styles={styles} handleColorChange={handleColorChange} />
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

const ColorContainer = styled.div`
  background-color: var(--bg-secondary);
`;

const ColorGroup = styled.div`
  margin-bottom: 5px;

  label {
    display: block;
    font-size: var(--font-p);
    color: var(--text-primary);
    margin-bottom: 10px;
    font-weight: 500;
  }
`;

const ColorOptions = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 10px;
`;

const ColorOption = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background-color: ${(props) => props.color};
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;
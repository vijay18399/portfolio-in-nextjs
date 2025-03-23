import { useState } from "react";
import styled from "styled-components";
import { PlusCircle } from "lucide-react"; // Icon for adding a widget

export default function SectionPlaceHolder({ onAddWidget }) {
  const [showWidgetSelector, setShowWidgetSelector] = useState(false);

  return (
    <PlaceholderContainer>
        <AddWidgetButton onClick={() => setShowWidgetSelector(true)}>
          <PlusCircle size={24} />
          Select a widget to add
        </AddWidgetButton>
    </PlaceholderContainer>
  );
}

const PlaceholderContainer = styled.div`
  border: 2px dashed var(--bg-secondary);
  padding: 20px;
  margin: 24px auto;
  max-width: 48rem;
  text-align: center;
  border-radius: 8px;
  background: var(--bg-secondary);
  cursor: pointer;
  transition: background 0.2s ease-in-out;
`;

const AddWidgetButton = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  color: #333;
  font-weight: 500;
  cursor: pointer;
  color: var(--brand);

`;

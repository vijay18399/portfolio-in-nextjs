import React, {useContext} from "react";
import { Trash2, Copy, ArrowUp, ArrowDown } from "lucide-react"; // Import icons from lucide-react
import styled from "styled-components"; // Import styled-components
import { useSelector, useDispatch } from 'react-redux'; // Import hooks from redux
import { setSelectedSectionId, addSection, toggleVisibility, reorderSections, init } from "@/features/page/pageSlice";
import { globalContext } from '@/context/GlobalContext'
export default function SectionControls({ data }) {
  const { isEditMode } = useContext(globalContext);
  const dispatch = useDispatch();
  const page = useSelector((state) => state.page.value);

  const onAddSection = (position) => {
    const newSection = {
      id: Date.now(), // Use timestamp for unique ID
      title: "New Section",
      template: "SectionPlaceHolder",
      data: {
        title: "New Section",
        description: ""
      }
    };

    const sourceIndex = page.sections.findIndex((section) => section.id === data.id);
    let updatedSections = [];

    if (position === "top") {
      updatedSections = [
        ...page.sections.slice(0, sourceIndex), // All sections before the current one
        newSection, // The new section to add
        ...page.sections.slice(sourceIndex) // All sections after the current one
      ];
    } else if (position === "bottom") {
      updatedSections = [
        ...page.sections.slice(0, sourceIndex + 1), // All sections before the current one, including it
        newSection, // The new section to add
        ...page.sections.slice(sourceIndex + 1) // All sections after the current one
      ];
    }

    dispatch(init({ sections: updatedSections })); // Update the sections state with the new order
  };

  const onSwapTop = () => {
    const sourceIndex = page.sections.findIndex((section) => section.id === data.id);
    if (sourceIndex > 0) {
      dispatch(reorderSections({ sourceIndex, destinationIndex: sourceIndex - 1 }));
    }
  };

  const onSwapDown = () => {
    const sourceIndex = page.sections.findIndex((section) => section.id === data.id);
    if (sourceIndex < page.sections.length - 1) {
      dispatch(reorderSections({ sourceIndex, destinationIndex: sourceIndex + 1 }));
    }
  };

  const onDelete = () => {
    const updatedSections = page.sections.filter((section) => section.id !== data.id);
    dispatch(init({ sections: updatedSections })); // Remove the deleted section
  };

  const onCopy = () => {
    const sourceIndex = page.sections.findIndex((section) => section.id === data.id);
    const copiedSection = { ...data, id: Date.now() }; // Create a new section with a unique ID

    // Insert the copied section right after the original section
    const updatedSections = [
      ...page.sections.slice(0, sourceIndex + 1), // All sections before the copied one
      copiedSection, // The copied section
      ...page.sections.slice(sourceIndex + 1), // All sections after the copied one
    ];

    dispatch(init({ sections: updatedSections }));
  };

  const onSelect = () => {
    dispatch(setSelectedSectionId(data.id)); // Set the selected section ID
  };
  if(!isEditMode) return null;
  return (
    <SectionControlsWrapper onClick={onSelect} isActive={data.id === page.selectedSectionId}>
      {data.id === page.selectedSectionId && (
        <>
          <AddSectionButton className="top" onClick={() => onAddSection("top")}>
            + Add Section
          </AddSectionButton>
          <SectionControlsButtonGroup>
            <SwapTopButton onClick={onSwapTop}>
              <ArrowUp size={16} />
            </SwapTopButton>
            <SwapDownButton onClick={onSwapDown}>
              <ArrowDown size={16} />
            </SwapDownButton>
            <DeleteButton onClick={onDelete}>
              <Trash2 size={16} />
            </DeleteButton>
            <CopyButton onClick={onCopy}>
              <Copy size={16} />
            </CopyButton>
          </SectionControlsButtonGroup>
          <AddSectionButton className="bottom" onClick={() => onAddSection("bottom")}>
            + Add Section
          </AddSectionButton>
        </>
      )}
    </SectionControlsWrapper>
  );
}

// Styled Components

const SectionControlsWrapper = styled.div`
  cursor: pointer;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: ${(props) => (props.isActive ? '#d5e8ff24' : 'transparent')} ;
  z-index: 4;
  border: 2px solid ${(props) => (props.isActive ? 'var(--fill-primary-active)' : "transparent")};
  border-radius: 12px;
`;

const AddSectionButton = styled.button`
  position: absolute;
  font-size: 12px;
  left: calc(50% - 50px);
  background: var(--fill-primary-active);
  color: white;
  padding: 6px 12px;
  border-radius: 10px;
  font-weight: 900;

  &.top {
    top: -16px;
  }

  &.bottom {
    bottom: -16px;
  }
`;

const SectionControlsButtonGroup = styled.div`
  position: absolute;
  top: -35px;
  background: var(--fill-primary-active);
  color: white;
  padding: 6px;
  gap: 10px;
  display: flex;
  border-radius: 10px;
  right: 10px;
`;

const SwapTopButton = styled.button``;

const SwapDownButton = styled.button``;

const DeleteButton = styled.button``;

const CopyButton = styled.button``;

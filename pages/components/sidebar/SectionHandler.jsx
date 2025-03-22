import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Eye, EyeOff, GripVertical } from "lucide-react";
import styled from "styled-components";
import { toggleVisibility, reorderSections, setSelectedSectionId } from "@/features/page/pageSlice";

export default function SectionHandler() {
  const page = useSelector((state) => state.page.value);
  const selectedSectionId = useSelector(state => state.page.value.selectedSectionId);
  useEffect(() => {
    if (selectedSectionId) {
      const sectionElement = document.getElementById(selectedSectionId);
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [selectedSectionId]);
  const dispatch = useDispatch();

  const onDragEnd = (result) => {
    if (!result.destination) return;
    dispatch(
      reorderSections({
        sourceIndex: result.source.index,
        destinationIndex: result.destination.index,
      })
    );
  };

  const handleToggleVisibility = (id) => {
    dispatch(toggleVisibility({ id }));
  };
  const handleSectionClick = (id) => {
    dispatch(setSelectedSectionId(id)); // Dispatch action to set the selected section ID
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="sections" direction="vertical">
        {(provided) => (
          <SectionHandlerContainer ref={provided.innerRef} {...provided.droppableProps}>
            {page.sections.map((section, index) => (
              <Draggable key={`${section.id}`} draggableId={`${section.id}`} index={index}>
                {(provided, snapshot) => (
                  <DraggableSection
                    onClick={() => handleSectionClick(section.id)}

                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={snapshot.isDragging ? "dragging" : ""}
                  >
                    <GripIcon className="grip" />
                    <SectionTitle>{section.title}</SectionTitle>
                    <VisibilityButton onClick={() => handleToggleVisibility(section.id)}>
                      {section.hidden ? <EyeOff /> : <Eye />}
                    </VisibilityButton>
                  </DraggableSection>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </SectionHandlerContainer>
        )}
      </Droppable>
    </DragDropContext>
  );
}

// Styled Components

const SectionHandlerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--gap-md);
  padding: var(--padding-md);
`;

const DraggableSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  border-radius: var(--border-radius);
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  box-shadow: var(--box-shadow-sm);
  cursor: grab;
  transition: background 0.2s ease-in-out, transform 0.2s ease-in-out;

  &:hover {
    background-color: var(--bg-primary);
  }

  &:active {
    cursor: grabbing;
  }

  &.dragging {
    transform: scale(1.02);
  }
`;

const GripIcon = styled(GripVertical)`
  cursor: grab;
`;

const SectionTitle = styled.h6`
  flex: 1;
  font-size: var(--font-h6);
  color: var(--text-default-title);
  margin-left: 10px;
`;

const VisibilityButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.8;
  }
`;

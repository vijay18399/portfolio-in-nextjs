import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Eye, EyeOff, GripVertical } from "lucide-react";
import styled from "styled-components";
import { toggleVisibility, reorderSections, setSelectedSectionId } from "@/features/page/pageSlice";

function SortableItem({ id, section, handleToggleVisibility, handleSectionClick }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? 'none' : transition,
    zIndex: isDragging ? 1 : 'auto',
    position: 'relative',
  };

  return (
    <DraggableSection
      ref={setNodeRef}
      style={style}
      onClick={() => handleSectionClick(section.id)}
      className={isDragging ? "dragging" : ""}
      {...attributes}
      {...listeners}
    >
      <GripIcon className="grip" />
      <SectionTitle>{section.title}</SectionTitle>
      <VisibilityButton onClick={(e) => {
        e.stopPropagation();
        handleToggleVisibility(section.id);
      }}>
        {section.hidden ? <EyeOff /> : <Eye />}
      </VisibilityButton>
    </DraggableSection>
  );
}

export default function SectionHandler() {
  const page = useSelector((state) => state.page.value);
  const selectedSectionId = useSelector(state => state.page.value.selectedSectionId);
  const dispatch = useDispatch();
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    if (selectedSectionId) {
      const sectionElement = document.getElementById(selectedSectionId);
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [selectedSectionId]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Need to move 8px before dragging starts
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    setActiveId(null);
    const { active, over } = event;
    
    if (active.id !== over.id) {
      const oldIndex = page.sections.findIndex(section => section.id === active.id);
      const newIndex = page.sections.findIndex(section => section.id === over.id);
      
      dispatch(
        reorderSections({
          sourceIndex: oldIndex,
          destinationIndex: newIndex,
        })
      );
    }
  };

  const handleToggleVisibility = (id) => {
    dispatch(toggleVisibility({ id }));
  };

  const handleSectionClick = (id) => {
    dispatch(setSelectedSectionId(id));
  };

  const activeItem = activeId ? page.sections.find(section => section.id === activeId) : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={page.sections.map(section => section.id)}
        strategy={verticalListSortingStrategy}
      >
        <SectionHandlerContainer>
          {page.sections.map((section) => (
            <SortableItem
              key={section.id}
              id={section.id}
              section={section}
              handleToggleVisibility={handleToggleVisibility}
              handleSectionClick={handleSectionClick}
            />
          ))}
        </SectionHandlerContainer>
      </SortableContext>
      
      <DragOverlay>
        {activeItem ? (
          <DraggableSectionOverlay>
            <GripIcon className="grip" />
            <SectionTitle>{activeItem.title}</SectionTitle>
            <VisibilityButton>
              {activeItem.hidden ? <EyeOff /> : <Eye />}
            </VisibilityButton>
          </DraggableSectionOverlay>
        ) : null}
      </DragOverlay>
    </DndContext>
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
  transition: transform 0.2s ease-in-out;
  touch-action: none; // Important for pointer events on touch devices

  &:hover {
    background-color: var(--bg-primary);
  }

  &:active {
    cursor: grabbing;
  }

  &.dragging {
    opacity: 0.5;
    background-color: var(--bg-primary);
  }
`;

const DraggableSectionOverlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  border-radius: var(--border-radius);
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  box-shadow: var(--box-shadow-lg);
  cursor: grabbing;
  width: 100%;
  opacity: 1;
  z-index: 100;
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
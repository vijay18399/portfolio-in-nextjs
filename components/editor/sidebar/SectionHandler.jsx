import React, { useEffect, useState, useContext } from "react";
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
import { toggleVisibility, reorderSections, setSelectedSectionId } from "@/features/page/pageSlice";
import { globalContext } from "@/context/GlobalContext";

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
    <div
      ref={setNodeRef}
      style={style}
      className={`draggable-section ${isDragging ? "dragging" : ""}`}
      onClick={() => handleSectionClick(section.id)}
      {...attributes}
      {...listeners}
    >
      <GripVertical className="grip-icon" />
      <h6 className="section-title">{section.title}</h6>
      <button
        className="visibility-button"
        onClick={(e) => {
          e.stopPropagation();
          handleToggleVisibility(section.id);
        }}
      >
        {section.hidden ? <EyeOff /> : <Eye />}
      </button>
    </div>
  );
}

export default function SectionHandler() {
  const page = useSelector((state) => state.page.value);
  const dispatch = useDispatch();
  const [activeId, setActiveId] = useState(null);
  const { activeTab, setActiveTab} =  useContext(globalContext);
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
    setActiveTab("");
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
        <div className="section-handler-container">
          {page.sections.map((section) => (
            <SortableItem
              key={section.id}
              id={section.id}
              section={section}
              handleToggleVisibility={handleToggleVisibility}
              handleSectionClick={handleSectionClick}
            />
          ))}
        </div>
      </SortableContext>
      
      <DragOverlay>
        {activeItem ? (
          <div className="draggable-section-overlay">
            <GripVertical className="grip-icon" />
            <h6 className="section-title">{activeItem.title}</h6>
            <button className="visibility-button">
              {activeItem.hidden ? <EyeOff /> : <Eye />}
            </button>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

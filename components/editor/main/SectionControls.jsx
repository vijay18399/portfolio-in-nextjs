import React, { useContext } from "react";
import { Trash2, Plus, Copy, ArrowUp, ArrowDown } from "lucide-react"; // Import icons from lucide-react
import { useSelector, useDispatch } from 'react-redux'; // Import hooks from redux
import { setSelectedSectionId, addSection, toggleVisibility, reorderSections, init } from "@/features/page/pageSlice";
import { globalContext } from '@/context/GlobalContext'
export default function SectionControls({ data }) {
  const { isEditMode } = useContext(globalContext);
  const dispatch = useDispatch();
  const page = useSelector((state) => state.page.value);
  const { setActiveTab } = useContext(globalContext);

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
    setActiveTab("")
    dispatch(setSelectedSectionId(data.id)); // Set the selected section ID
  };

  if (!isEditMode) return null;

  return (
    <div
      className={`section-controls-wrapper ${data.id === page.selectedSectionId ? 'active' : ''}`}
      onClick={onSelect}
    >
      {data.id === page.selectedSectionId && (
        <>
          <button className="add-section-button top" onClick={() => onAddSection("top")}>
            <Plus size={16} /> Add Section
          </button>
          <div className="section-controls-button-group">
            <button className="swap-top-button" onClick={onSwapTop}>
              <ArrowUp size={16} />
            </button>
            <button className="swap-down-button" onClick={onSwapDown}>
              <ArrowDown size={16} />
            </button>
            <button className="delete-button" onClick={onDelete}>
              <Trash2 size={16} />
            </button>
            <button className="copy-button" onClick={onCopy}>
              <Copy size={16} />
            </button>
          </div>
          <button className="add-section-button bottom" onClick={() => onAddSection("bottom")}>
          <Plus size={16} /> Add Section
          </button>
        </>
      )}
    </div>
  );
}

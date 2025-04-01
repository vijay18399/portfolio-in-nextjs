import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateSection } from "@/features/page/pageSlice";
import SectionEditorForm from "./SectionEditorForm";

const SectionEditorContainer = () => {
  console.log("Rendered SectionEditorContainer");
  const dispatch = useDispatch();
  const page = useSelector((state) => state.page.value);
  const [sectionSelected, setSectionSelected] = useState(null);
  // Log selectedSectionId and sections changes
  useEffect(() => {
    console.log("Selected Section ID changed:", page.selectedSectionId);
    console.log("Sections changed:", page.sections);
  }, [page.selectedSectionId, page.sections]);

  // Update sectionSelected and formData when selectedSectionId or sections change
  useEffect(() => {
    const selectedSection = page.sections.find(
      (section) => section.id === page.selectedSectionId
    );

    if (selectedSection) {
      console.log("Selected section found:", selectedSection);
      setSectionSelected(selectedSection);
    } else {
      console.log("No section selected, resetting formData");
      setSectionSelected(null);
    }
  }, [page.selectedSectionId, page.sections]);

  const handleSave = (formData) => {
    if (sectionSelected) {
      console.log("Saving formData:", formData);
      dispatch(updateSection({ id: sectionSelected.id, data: formData }));
    }
  };

  if (!sectionSelected) return null;

  return (
    <SectionEditorForm
      sectionSelected={sectionSelected}
      handleSave={handleSave}
    />
  );
};

export default SectionEditorContainer;
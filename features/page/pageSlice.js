import { createSlice } from '@reduxjs/toolkit';

export const pageSlice = createSlice({
  name: 'page',
  initialState: {
    value: {
      styles: {},
      sections: [],
      selectedSectionId: null,
    },
  },
  reducers: {
    init: (state, action) => {
      state.value = { ...state.value, ...action.payload };
    },
    setSelectedSectionId: (state, action) => {
      state.value.selectedSectionId = action.payload;
    },
    toggleVisibility: (state, action) => {
      const { id } = action.payload;
      const sectionIndex = state.value.sections.findIndex((section) => section.id === id);
      if (sectionIndex !== -1) {
        state.value.sections[sectionIndex].hidden = !state.value.sections[sectionIndex].hidden;
      }
    },
    reorderSections: (state, action) => {
      const { sourceIndex, destinationIndex } = action.payload;
      const updatedSections = [...state.value.sections];
      const [movedSection] = updatedSections.splice(sourceIndex, 1);
      updatedSections.splice(destinationIndex, 0, movedSection);
      state.value.sections = updatedSections;
    },
    addSection: (state,action) => {
      let newSection ={}
      if(action.payload){
        newSection = {
          id: Date.now(), 
          ...action.payload
        }
      }else{
         newSection = {
          id: Date.now(), 
          title: "Add Section",
          template: "SectionPlaceHolder",
          data: {
            title: "Add Section",
            description: "",
          },
        };
      }

      state.value.sections.push(newSection);
      state.value.selectedSectionId = newSection.id;
    },
    updateSection: (state, action) => {
      const { id, data } = action.payload;
      const sectionIndex = state.value.sections.findIndex((section) => section.id === id);
      console.log(sectionIndex)
      if (sectionIndex !== -1) {
        state.value.sections[sectionIndex] = { ...state.value.sections[sectionIndex], data : data };
        console.log(state.value.sections)
      }
      console.log("updated")
    },
  },
});

export const { init, setSelectedSectionId, toggleVisibility, reorderSections, addSection, updateSection } = pageSlice.actions;

export default pageSlice.reducer;

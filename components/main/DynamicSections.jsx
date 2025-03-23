import React, { useContext } from "react";
import { useSelector, useDispatch } from 'react-redux'
import templateMap from "@/utils/templateMap";
export default function DynamicSections() {
    const page = useSelector((state) =>{ return  state.page.value})
    return (
        <>
            {page?.sections?.map((section, index) =>{
                  const SectionComponent = templateMap[section.template].component;
                  return SectionComponent && section.hidden!=true ? (
                      <SectionComponent key={section.id}  data={section}   />
                  ) : null;
            })}
        </>
    );
}

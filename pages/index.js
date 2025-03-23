import React, { useContext, useEffect } from "react";
import DynamicSections from "@/components/main/DynamicSections";
import SectionEditorContainer from '@/components/sidebar/SectionEditorContainer'
import { globalContext } from "@/context/GlobalContext";
import SideBar from '@/components/sidebar/SideBar';
import { init } from '@/features/page/pageSlice'
import { useSelector, useDispatch } from 'react-redux'

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/portfolio");
  const portfolio = await res.json();
  return { props: { portfolio } };
}

export default function Home({ portfolio }) {
  const { isEditMode } = useContext(globalContext);
  const dispatch = useDispatch()
  useEffect(() => {
    if (portfolio) {
      dispatch(init(portfolio))
    }
  }, [portfolio]);

  return (
    <div className="layout">
      {isEditMode && <SideBar/>}
      <main className="container">
        <DynamicSections/>
      </main>
      {isEditMode && <SectionEditorContainer/>}
    </div>
  );
}


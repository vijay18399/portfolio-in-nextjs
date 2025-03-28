import React, { useContext, useEffect } from "react";
import DynamicSections from "@/components/main/DynamicSections";
import SectionEditorContainer from '@/components/sidebar/SectionEditorContainer'
import { globalContext } from "@/context/GlobalContext";
import SideBar from '@/components/sidebar/SideBar';
import { init } from '@/features/page/pageSlice'
import { useSelector, useDispatch } from 'react-redux'
import path from 'path'
import fs from 'fs';
export async function getStaticProps () {
  const filePath = path.join(process.cwd(), 'public', 'data', 'portfolio.json');
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const portfolio = JSON.parse(jsonData);
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


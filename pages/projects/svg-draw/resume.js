import React from "react";
import Head from "next/head";
import styles from "@/styles/Home.module.css";
import "../styles/resume.css";
import HeaderTemplateV1 from '../../components/template/headerV1'
import { IntroTemplate, EducationTemplate,ExperienceTemplate,PublicationTemplate,SkillsTemplate,ProjectsTemplate     } from './resume_components'
const templateMap = {
  personal_info_template: IntroTemplate,
  education_template: EducationTemplate,
  experience_template: ExperienceTemplate,
  publication_template: PublicationTemplate,
  skills_template: SkillsTemplate,
  project_template: ProjectsTemplate,
};
export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/resume");
  const resumeData = await res.json();
  return { props: { resumeData } };
}

export default function Home({ resumeData }) {
  return (
    <div className="container}>
      <Head>
        <title> Resume</title>
      </Head>
      <main className="resumeWrapper">
        {resumeData.sections.map((section, index) => {
          const Component = templateMap[section.template];
          return Component ? (
            <div key={index} className="section}>
              <HeaderTemplateV1 {...section}  />
              <Component {...section} />
            </div>
          ) : null;
        })}
      </main>
    </div>
  );
}
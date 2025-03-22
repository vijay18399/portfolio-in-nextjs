import React, { useState } from "react";
import Image from "next/image";
import Modal from "@/pages/projects/svg-draw/modal";
export default function ProjectSection({ portfolioData }) {
  
  const [selectedProject, setSelectedProject] = useState(null);
  if(!portfolioData) return null; 
  return (
    <section id="projects" style={{ flexDirection: "column" }} className="Section">
      <h1 className="title">Projects</h1>
      <h2 className="subTitle">
        Some of the projects I've worked on besides my full-time roles.
      </h2>
      <div className="projects">
        {portfolioData?.projects?.map((project, index) => (
          <div
            key={index}
            className="projectContainer"
            onClick={() => setSelectedProject(project)}
          >
            <div className="projectIcon">
              <Image width="50" height="50" src={project.logo} alt={project.name} />
            </div>
            <div className="infoWrapper">
              <h3>{project.name}</h3>
              <h5>{project.description}</h5>
            </div>
          </div>
        ))}
      </div>

      {selectedProject && (
        <Modal
          title={selectedProject.name}
          onClose={() => setSelectedProject(null)}
        >
          <iframe
            style={{ height: "100%", width: "100%", border: "0px" }}
            src={selectedProject.liveUrl}
            title={selectedProject.name}
          />
        </Modal>
      )}
    </section>
  );
}
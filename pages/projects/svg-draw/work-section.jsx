import React, { useState } from "react";
import Image from "next/image";
import Modal from "@/pages/projects/svg-draw/modal";
export default function WorkSection({ portfolioData }) {
  const [selectedCompany, setSelectedCompany] = useState(null);
  if(!portfolioData) return null; 
  return (
    <section id="work" style={{ flexDirection: "column" }} className="Section">
      <h1 className="title">Work Experience</h1>
      <h2 className="subTitle">
        Here's an overview of my work, professionally as a software engineer.
      </h2>
      <div className="work">
        {portfolioData?.experience?.map((company) => (
          <div
            key={company.name}
            onClick={() => setSelectedCompany(company)}
            className="workContainer"
          >
            <div className="iconWrapper">
              <Image width="50" height="50" src={company.logo} alt={company.name} />
            </div>
            <div className="infoWrapper">
                <h3>{company.name}</h3>
                <h5>{company.role}</h5>
            </div>
        
          </div>
        ))}
      </div>

      {selectedCompany && (
        <Modal
          title="Experience"
          onClose={() => setSelectedCompany(null)}
        >
          <div className="modalContainer">
          <div className="Header">
            <Image
              width="50"
              height="50"
              src={selectedCompany.logo}
              alt={selectedCompany.name}
              className="modalLogo"
            />
            <div>
              <h2 className="modalTitle">{selectedCompany.name}</h2>
              <h3 className="modalRole">{selectedCompany.role}</h3>
              <p className="modalDuration">{selectedCompany.duration}</p>
            </div>
          </div>
          <p className="modalDescription">{selectedCompany.description}</p>
          <blockquote className="modalQuote">{selectedCompany.responsibilities}</blockquote>
          <ul className="modalTasks">
            {selectedCompany.tasks.map((task, index) => (
              <li key={index} className="modalTaskItem">{task}</li>
            ))}
          </ul>
          </div>
        </Modal>
      )}
    </section>
  );
}
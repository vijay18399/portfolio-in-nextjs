import React, { useRef, useEffect } from "react";
import Link from "next/link";
import SectionControls from "../editor/main/SectionControls";

export default function Intro({ data }) {
  const imageContainerRef = useRef(null);

  useEffect(() => {
    if (imageContainerRef.current && window.Sticker) {
      window.Sticker.init(imageContainerRef.current);
    }
  }, []);

  return (
    <section id={data.id} className="section" style={{ backgroundColor: data?.data?.styles?.backgroundColor || 'var(--bg-primary)' }}>
      <SectionControls data={data} />
      <div className="section-row">
        <div
          ref={imageContainerRef}
          className="profile-image sticker"
          style={{
            "--profile-image": `url(${data.data?.imageUrl || "/images/profile_default.png"})`,
          }}
        />
        <div className="intro-div">
          <h1 className="title" dangerouslySetInnerHTML={{ __html: data.data?.title }} />
          <p className="description" dangerouslySetInnerHTML={{ __html: data.data?.description }} />
          <div className="button-group">
            {data.data?.links?.map((link, index) => (
              <Link key={index} href={link.href} className="styled-link">
                {link.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
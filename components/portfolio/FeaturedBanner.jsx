import React from 'react';
import SectionControls from '@/components/editor/main/SectionControls';

const FeaturedBanner = ({ data }) => {
  return (
    <section id={data.id} className="section" style={data?.data?.styles}>
      <SectionControls data={data} />
      <div style={{alignItems: 'center'}} className="section-column">
        <h3
          className="title"
          dangerouslySetInnerHTML={{ __html: data.data?.title }}
        />
        <p
          className="description"
          dangerouslySetInnerHTML={{ __html: data.data?.description }}
        />
        {data.data?.links?.map((link, index) => (
          <a key={index} href={link.href} className="featured-banner-link">
            {link.title}
          </a>
        ))}
      </div>
    </section>
  );
};

export default FeaturedBanner;

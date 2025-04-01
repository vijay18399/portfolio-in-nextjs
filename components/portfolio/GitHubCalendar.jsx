import React from 'react';
import GitHubCalendar from 'react-github-calendar';
import SectionControls from '@/components/editor/main/SectionControls';

const GitHubCalendarSection = ({ data }) => {
  return (
    <section id={data.id} className="section">
      <SectionControls data={data} />
      <div className="section-column">
        <h2
          className="title"
          dangerouslySetInnerHTML={{ __html: data.data?.title }}
        />
        <p
          className="description"
          dangerouslySetInnerHTML={{ __html: data.data?.description }}
        />
        <GitHubCalendar
          username={data.data?.github_username}
          blockSize={12}
          blockMargin={5}
          fontSize={14}
        />
      </div>
    </section>
  );
};

export default GitHubCalendarSection;

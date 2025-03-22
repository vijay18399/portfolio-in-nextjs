import React from 'react';
import GitHubCalendar from 'react-github-calendar';
import SectionControls from '@/pages/components/main/SectionControls';
import styled from 'styled-components';

const GitHubCalendarSection = ({ data }) => {
  return (
    <SectionContainer id={data.id} styles={data?.data?.styles}>
       <SectionControls data={data} />
          <SectionColumn>
                <Title dangerouslySetInnerHTML={{ __html: data.data?.title }} />
                <Description dangerouslySetInnerHTML={{ __html: data.data?.description }} />
                 <GitHubCalendar username={data.data?.github_username} blockSize={12} blockMargin={5} fontSize={14} />
          </SectionColumn>
    </SectionContainer>
  );
};

const SectionContainer = styled.div`
    background-color: ${(props) => (props.styles?.backgroundColor || 'transparent')};
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 150px;
    padding: var(--padding-md);
    width: 100%;
    margin: 20px 0px;
`;

const SectionColumn = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 48rem;
    margin: 0 auto;
    overflow: hidden;
`;

const Title = styled.h4`
    font-size: var(--font-h4);
    font-weight: bold;
    color: var(--text-default-title);
`;

const Description = styled.p`
    font-size: var(--font-p);
    font-weight: 400;
    opacity: 0.8;
    color: var(--text-default-body);
`;

export default GitHubCalendarSection;
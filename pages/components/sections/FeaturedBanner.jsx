import React from 'react';
import SectionControls from '@/pages/components/main/SectionControls';
import styled from 'styled-components';

const FeaturedBanner = ({ data }) => {
  return (
    <SectionContainer id={data.id} styles={data?.data?.styles}>
      <SectionControls data={data} />
      <SectionColumn>
        <Title dangerouslySetInnerHTML={{ __html: data.data?.title }} />
        <Description dangerouslySetInnerHTML={{ __html: data.data?.description }} />
        {data.data?.links?.map((link, index) => (
          <ChannelLink key={index} href={link.href}>
            {link.title}
          </ChannelLink>
        ))}
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
  min-height: 200px;
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
  text-align: center;
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

const ChannelLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--button-primary-bg);
  color: var(--text-static-white);
  font-size: var(--font-p);
  font-weight: 600;
  padding: 12px 24px;
  border-radius: var(--border-radius);
  text-decoration: none;
  margin-top: 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--button-secondary-hover-bg);
  }
`;


export default FeaturedBanner;
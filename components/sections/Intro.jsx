import React, { useRef, useEffect } from "react";
import Link from "next/link";
import SectionControls from "../main/SectionControls";
import styled from "styled-components";

export default function Intro({ data }) {
  const imageContainerRef = useRef(null);
  useEffect(() => {
    if (imageContainerRef.current && window.Sticker) {
      window.Sticker.init(imageContainerRef.current);
    }
  }, []);

  return (
    <Section id={data.id} styles={data?.data?.styles}>
      <SectionControls data={data} />
      <SectionRow>
        <ProfileImage
          ref={imageContainerRef}
          style={{
            "--profile-image": `url(${data.data?.imageUrl || "/images/profile_default.png"})`,
          }}
          className="sticker"
        />
        <IntroDiv>
          <Title dangerouslySetInnerHTML={{ __html: data.data?.title }} />
          <Description dangerouslySetInnerHTML={{ __html: data.data?.description }} />
          <ButtonGroup>
            {data.data?.links?.map((link, index) => (
              <StyledLink key={index} href={link.href}>
                {link.title}
              </StyledLink>
            ))}
          </ButtonGroup>
        </IntroDiv>

      </SectionRow>
    </Section>
  );
}

const Section = styled.section`
  background-color: ${(props) => props.styles?.backgroundColor || 'var(--bg-primary)'};
  position: relative;
  margin: 28px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 450px;
  padding: var(--padding-md);
`;

const SectionRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 25px;
    max-width: 48rem;
    width: 100%;
    align-items: center;
`;

const ProfileImage = styled.div`
  flex: 0 0 280px;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 280px; 
  height: 280px;
  border-radius: var(--border-radius);
`;

const IntroDiv = styled.div`
  flex: 1; 
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--gap-md);
  max-width: 600px;
  margin-left: 20px;
`;

const StyledLink = styled(Link)`
  background: var(--button-primary-bg);
  color: var(--text-static-white);
  padding: 8px 15px;
  border-radius: 18px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;

  &:hover {
    background: var(--button-primary-hover-bg);
  }
`;

const Title = styled.h1`
  font-size: var(--font-h1);
  font-weight: bold;
  color: var(--text-primary);
`;

const Description = styled.p`
  font-size: var(--font-p);
  font-weight: 400;
  color: var(--text-secondary);
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: var(--gap-md);
`;

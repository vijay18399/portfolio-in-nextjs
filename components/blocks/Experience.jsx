import Image from "next/image";
import styled from "styled-components";

export default function Experience({ data }) {
  return (
    <ExperienceContainer>
      <IconWrapper>
        <Image
          width="50"
          height="50"
          src={data.data.logo}
          alt={data.data.name}
          className="experience-logo"
        />
      </IconWrapper>
      <InfoWrapper>
        <InfoWrapper2>
          <LeftSide>
            <CompanyName>{data.data.title}</CompanyName>
            <Role>{data.data.role}</Role>
          </LeftSide>
          <RightSide>
            <Location>{data.data.location}</Location>
            <Duration>{data.data.duration}</Duration>
          </RightSide>
        </InfoWrapper2>
        {data.data.responsibilities && <Responsibilities>{data.data.responsibilities}</Responsibilities>}
      </InfoWrapper>
    </ExperienceContainer>
  );
}

// Styled Components

const ExperienceContainer = styled.div`
  width: 100%;
  display: flex;
  gap: var(--gap-md);
  margin-bottom: var(--gap-md);
  align-items: flex-start;
  padding: var(--padding-md);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  background-color: var(--bg-card);
`;

const IconWrapper = styled.div`
  flex-shrink: 0;
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
`;

const CompanyName = styled.h4`
  font-size: var(--font-h4);
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
  padding: 0;
`;

const Role = styled.h5`
  font-size: var(--font-h5);
  font-weight: 500;
  color: var(--text-secondary);
  margin: 5px 0;
`;

const Location = styled.p`
  font-size: var(--font-p);
  color: var(--text-muted);
  margin: 0;
`;

const Duration = styled.p`
  font-size: var(--font-p);
  color: var(--text-muted);
  margin: 5px 0;
`;

const Responsibilities = styled.p`
  font-size: var(--font-p);
  color: var(--text-secondary);
  margin-top: 10px;
  line-height: 1.5;
`;

const InfoWrapper2 = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    flex-grow: 1;
`;

const LeftSide = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const RightSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;
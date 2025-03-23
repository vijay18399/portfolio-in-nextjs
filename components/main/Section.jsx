import templateMap from "@/utils/templateMap";
import SectionControls from '@/components/main/SectionControls';
import styled from "styled-components";

export default function Section({ data }) {
  return (
    <SectionWrapper id={data.id} styles={data?.data?.styles}>
      <SectionControls data={data} />
      <SectionColumn>
        <Title dangerouslySetInnerHTML={{ __html: data.data?.title }} />
        <SubTitle dangerouslySetInnerHTML={{ __html: data.data?.description }} />
        <ChildContainer>
          {data?.children?.map((child, index) => {
            const ChildComponent = templateMap[child.template]?.component;
            return ChildComponent && child.hidden !== true ? (
              <ChildComponent key={child.id} data={child} />
            ) : null;
          })}
        </ChildContainer>
      </SectionColumn>
    </SectionWrapper>
  );
}

const SectionWrapper = styled.section`
  background-color: ${(props) => props.styles?.backgroundColor || 'var(--bg-primary)'};
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
`;

const Title = styled.h2`
  font-size: var(--font-h2);
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
  padding: 0;
`;

const SubTitle = styled.p`
  font-size: var(--font-p);
  font-weight: 400;
  color: var(--text-secondary);
  margin: 10px 0;
`;

const ChildContainer = styled.div`
  display: flex;
  gap: var(--gap-md);
  flex-wrap: wrap;
  margin: 10px 0;
`;

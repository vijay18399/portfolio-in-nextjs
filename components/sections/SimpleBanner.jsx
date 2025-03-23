import styled from "styled-components";
import SectionControls from '@/components/main/SectionControls';
import Link from "next/link";

export default function SimpleBanner({ data }) {
  return (
    <BannerWrapper id={data.id}>
      <SectionControls data={data} />
      <BannerContainer>
        <BannerText dangerouslySetInnerHTML={{ __html: data.data?.description }} />
        {data.data?.links?.map((link, index) => (
          <StyledLink key={index} href={link.href}>
            {link.title}
          </StyledLink>
        ))}
      </BannerContainer>
    </BannerWrapper>
  );
}

const BannerWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--padding-md) 0;
`;

const BannerContainer = styled.div`
  background-color: var(--bg-banner);
  padding: 10px 25px;
  margin: 0 12px;
  text-align: center;
  border-radius: var(--border-radius);
  width: 100%;
  max-width: 48rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BannerText = styled.h5`
  color: var(--text-static-white);
  font-size: var(--font-h5);
  font-weight: bold;
  text-align: left;
`;

const StyledLink = styled(Link)`
  background-color: var(--button-secondary-bg);
  color: var(--text-primary);
  border: none;
  padding: 10px 20px;
  border-radius: 45px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;

  &:hover {
    background-color: var(--button-secondary-hover-bg);
  }
`;

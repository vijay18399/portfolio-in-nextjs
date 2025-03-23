import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

export default function Portfolio({ data }) {
  return (
    <Card href={data.data.route}>
      <ImageWrapper>
        <RoundedImage
          src={data.data.image}
          alt={data.data.title}
          width={220}
          height={120}
        />
      </ImageWrapper>
    </Card>
  );
}

// Styled Components
const RoundedImage = styled(Image)`
  border-radius: var(--border-radius);
`;

const Card = styled(Link)`
 width: 100%;
  min-width: 220px;
  max-width: 350px;
  display: flex;
  justify-content: center;
  text-decoration: none;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  background-color: var(--bg-card);
  box-shadow: var(--box-shadow-sm);
  overflow: hidden;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  border-radius: var(--border-radius);
  justify-content: center;
  width: 220px;
`;

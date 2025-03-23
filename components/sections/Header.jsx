import { useRouter } from "next/router";
import Link from "next/link";
import SectionControls from "../main/SectionControls";
import styled from "styled-components";

export default function Header({ data }) {
  const router = useRouter();

  return (
    <HeaderWrapper id={data.id}>
      <SectionControls data={data} />
      <Profile>{data.data.title}</Profile>
      <Nav>
        {data?.data?.links.map(({ title, href }, index) => (
          <NavLink
            key={index}
            href={href}
            className={router.pathname === href ? "activeLink" : ""}
          >
            {title}
          </NavLink>
        ))}
      </Nav>
    </HeaderWrapper>
  );
}

// Styled Components

const HeaderWrapper = styled.header`
background: var(--bg-secondary);
    margin: 28px auto 0;
    max-width: 48rem;
    height: 60px;
    position: relative;
    display: flex;
    width: 95%;
    align-items: center;
    justify-content: space-between;
    border-radius: var(--border-radius);
`;

const Profile = styled.div`
  background-color: var(--fill-primary-active);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  color: var(--text-static-white);
  margin-left: 10px;
`;

const Nav = styled.nav`
  display: flex;
  gap: var(--gap-md);
  padding: 8px;
  border-radius: 24px;
  align-items: center;
`;

const NavLink = styled(Link)`
    display: flex;
    align-items: center;
    padding: 4px;
    font-size: 0.875rem;
    font-weight: 400;
    margin: 0 4px;
    text-decoration: none;
    color: var(--text-default-title);
    position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 50%;
    width: 0;
    height: 4px;
    background: var(--fill-primary-active);
    border-radius: 2px;
    transition: all 0.3s ease-in-out;
    transform: translateX(-50%);
  }

  &:hover::after,
  &.activeLink::after {
    width: 100%;
  }
`;

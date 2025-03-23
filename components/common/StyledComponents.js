import styled  from 'styled-components'
export const StyledContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #312C4F;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 8px;
  display: flex;
`;

export const StyledCard = styled.div`
display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: 1px solid var(--border-color);
    background-color: var(--bg-card);
    border-radius: 19px;
    width: 100%;
    max-width: 700px;
    padding: 10px 40px;
    box-shadow: var(--box-shadow-sm);
    z-index: 3;
`;

export const StyledTitle = styled.h1`
    font-size: 32px;
    margin-bottom: 40px;
    color: var(--text-default-title);
    font-weight: 700;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const LevelsContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
`;

export const StyledLevelCard = styled.button`
  background: ${(props) => props.background};
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--border-color);
  border-radius: 12px;
  width: 100%;
  max-width: 225px;
  padding: 10px;
  height: 60px;
  font-size: 16px;
  font-weight: 900;
  cursor: pointer;
  transition: all 0.3s ease;
  color: ${(props) => (props.selected ? 'var(--text-static-white)' : 'var(--text-primary)')};
  &:hover {
    transform: scale(1.05);
  }
`;

export const StartButton = styled.button`
  margin-top: 40px;
  padding: 12px 24px;
  font-size: 18px;
  color: var(--text-static-white);
  border: none;
  border-radius: 30px;
  display: flex;
  gap: 13px;
  align-items: center;
  background-color: ${(props) => (props.disabled ? '#aaa' : '#1469C0')};
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${(props) => (props.disabled ? '#aaa' : '#053b72')};
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(56, 56, 110, 0.5);
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
`;

export const QuestionTrack = styled.span`
  color: var(--text-primary);
  font-size: 18px;
`;

export const TimerText = styled.span`
    color: #E65100;
    font-size: 14px;
    background: #FFF3E0;
    padding: 5px 15px;
    border-radius: 10px;
    font-weight: 500;
    display: flex;
    gap: 10px;
    align-items: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const ButtonToListen = styled.button`
    margin-bottom: 20px;
    background-color: #1469C0;
    color: white;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const InputContainer = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    flex-wrap: wrap;
`;

export const Input = styled.input`
  width: 40px;
  height: 40px;
  text-align: center;
  font-size: 18px;
  border: 2px solid var(--border-color);
  border-radius: 8px;
`;

export const Button = styled.button`
  background-color: #43A047;
  color: white;
  border-radius: 30px;
  padding: 12px 24px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #388E3C;
  }
`;
export const SkipButton = styled.button`
    margin-top: 20px;
    background-color: #FF7043;
    color: white;
    border-radius: 30px;
    padding: 12px 24px;
    border: none;
    cursor: pointer;
    position: absolute;
    right: 30px;
    bottom: 30px;
  &:hover {
    background-color: #E64A19;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(56, 56, 110, 0.5);
  }
`;

export const StyledDescription = styled.p`
  font-size: 16px;
  color: #555;
  margin-bottom: 20px;
`;
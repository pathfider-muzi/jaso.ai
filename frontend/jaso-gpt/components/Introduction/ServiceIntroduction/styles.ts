import styled from "@emotion/styled";
import PALETTE from "@/constants/palette";
import BUTTON_THEME from "@/styles/buttonTheme";
import ButtonComponent from "@/components/common/Button";

export const Frame = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h1`
  margin: 0;
  line-height: 1.15;
  text-align: center;
  font-size: 4rem;
`;

export const Description = styled.p`
  margin: 4rem 0;
  line-height: 1.5;
  font-size: 1.5rem;
  text-align: center;
`;

export const Button = styled(ButtonComponent)`
  padding: 1.5rem;
  text-align: left;
  color: inherit;
  text-decoration: none;
  max-width: 300px;
  font-weight: bold;
  font-size: 1.5rem;
  ${BUTTON_THEME.SIMPLE}
  border: none;
  background-image: linear-gradient(
    286deg,
    rgb(76, 160, 252) 23%,
    rgb(224, 47, 238) 76%
  );
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

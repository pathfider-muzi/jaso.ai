import styled from "@emotion/styled";
import ButtonComponent from "../Button";

export const Frame = styled.main`
  min-height: 100vh;
  padding: 4rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h1`
  margin: 0;
  line-height: 1.15;
  font-size: 4rem;
`;

export const Description = styled.p`
  margin: 4rem 0;
  line-height: 1.5;
  font-size: 1.5rem;
`;

export const Button = styled(ButtonComponent)`
  max-width: 800px;
  margin: 1rem;
  padding: 1.5rem;
  text-align: left;
  color: inherit;
  text-decoration: none;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  transition: color 0.15s ease, border-color 0.15s ease;
  max-width: 300px;
  font-weight: bold;
  font-size: 1.5rem;

  &:hover {
    color: #0070f3;
    border-color: #0070f3;
  }

  &:hover > span {
    transform: scale(2);
  }
`;

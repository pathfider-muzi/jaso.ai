import ButtonComponent from "@/components/_common/Button";
import BUTTON_THEME from "@/constants/styles/buttonTheme";
import PALETTE from "@/constants/styles/palette";
import verticalStyle from "@/constants/styles/verticalStyle";
import styled from "@emotion/styled";

export const Frame = styled.section`
  ${verticalStyle};
  position: relative;
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
  background-color: ${PALETTE.BLUE};
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

export const HeroGradient = styled.div`
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  filter: blur(100px);
  user-select: none;
  pointer-events: none;
`;

export const PinkCircle = styled.div`
  width: 1500px;
  height: 1500px;
  z-index: -2;
  left: 60%;
  position: absolute;
  border-radius: 100%;
  background-color: ${PALETTE.HOT_PINK};
  opacity: 0.6;
  animation-name: "pink-circle-rotation";
  animation-duration: 7s;
  animation-iteration-count: infinite;
  animation-timing-function: cubic-bezier(0.1, 0, 0.9, 1);

  @keyframes pink-circle-rotation {
    0% {
      transform: translateY(-50%) translateX(-50%) rotate(-20deg) translateX(20%);
    }
    25% {
      transform: translateY(-50%) translateX(-50%) skew(-15deg, -15deg) rotate(80deg) translateX(30%);
    }
    50% {
      transform: translateY(-50%) translateX(-50%) rotate(180deg) translateX(25%);
    }
    75% {
      transform: translateY(-50%) translateX(-50%) skew(15deg, 15deg) rotate(240deg) translateX(15%);
    }
    100% {
      transform: translateY(-50%) translateX(-50%) rotate(340deg) translateX(20%);
    }
  }
`;

export const GreenCircle = styled.div`
  opacity: 0.4;
  width: 1500px;
  height: 1000px;
  z-index: -1;
  top: 50%;
  animation-duration: 7s;
  animation-name: "green-circle-rotation";
  animation-direction: reverse;
  position: absolute;
  border-radius: 100%;
  background-color: ${PALETTE.MINT};
  opacity: 0.6;
  animation-iteration-count: infinite;
  animation-timing-function: cubic-bezier(0.1, 0, 0.9, 1);

  @keyframes green-circle-rotation {
    0% {
      transform: translateY(-50%) translateX(-50%) rotate(40deg) translateX(-20%);
    }
    25% {
      transform: translateY(-50%) translateX(-50%) skew(15deg, 15deg) rotate(110deg) translateX(-5%);
    }
    50% {
      transform: translateY(-50%) translateX(-50%) rotate(210deg) translateX(-35%);
    }
    75% {
      transform: translateY(-50%) translateX(-50%) skew(-15deg, -15deg) rotate(300deg) translateX(-10%);
    }
    100% {
      transform: translateY(-50%) translateX(-50%) rotate(400deg) translateX(-20%);
    }
  }
`;

export const VioletCircle = styled.div`
  width: 1500px;
  height: 1000px;
  z-index: -3;
  left: 60%;
  top: 70%;
  border-radius: 100%;
  background-color: ${PALETTE.VIOLET};
  opacity: 0.6;
  position: absolute;
  animation-duration: 7s;
  animation-name: "violet-circle-rotation";
  animation-iteration-count: infinite;
  animation-timing-function: cubic-bezier(0.1, 0, 0.9, 1);

  @keyframes violet-circle-rotation {
    0% {
      transform: translateY(-50%) translateX(-50%) translateX(-15%) translateY(10%);
    }
    20% {
      transform: translateY(-50%) translateX(-50%) translateX(20%) translateY(-30%);
    }
    40% {
      transform: translateY(-50%) translateX(-50%) translateX(-25%) translateY(-15%);
    }
    60% {
      transform: translateY(-50%) translateX(-50%) translateX(30%) translateY(20%);
    }
    80% {
      transform: translateY(-50%) translateX(-50%) translateX(5%) translateY(35%);
    }
    100% {
      transform: translateY(-50%) translateX(-50%) translateX(-15%) translateY(10%);
    }
  }
`;

export const DownArrow = styled.div`
  font-size: 3rem;
  font-weight: 900;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  animation: move 1.5s linear infinite;
  cursor: pointer;
  filter: invert(100%);

  @keyframes move {
    25% {
      opacity: 1;
    }
    33% {
      opacity: 1;
      transform: translateY(30px);
    }
    67% {
      opacity: 1;
      transform: translateY(40px);
    }
    100% {
      opacity: 0;
      transform: translateY(55px) scale3d(0.5, 0.5, 0.5);
    }
  }
`;

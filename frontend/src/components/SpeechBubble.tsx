import * as React from "react";
import styled from "@emotion/styled";

export interface Props {
  text: string;
}

const SpeechBubble = ({ text }: Props) => {
  return <Frame>{text}</Frame>;
};

export default SpeechBubble;

const Frame = styled.div`
  & {
    padding: 8px;
    min-width: 400px;
    width: fit-content;
    height: fit-content;
    bottom: 40px;
    right: 12px;
    position: absolute;
    background: #00aabb;
    border-radius: 6px;
    border-bottom-right-radius: 0;
  }

  &:after {
    content: "";
    position: absolute;
    bottom: 12px;
    right: 0;
    width: 0;
    height: 0;
    border: 20px solid transparent;
    border-top-color: #00aabb;
    border-bottom: 0;
    border-right: 0;
    margin-left: -10px;
    margin-bottom: -20px;
  }
`;

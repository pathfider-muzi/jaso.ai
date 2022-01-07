import * as React from "react";
import icon from "../../public/icon16.png";
import styled from "@emotion/styled";

interface Props {
  onClick: () => void;
}

const Icon = ({ onClick }: Props) => {
  const onClickIcon = (event: React.MouseEvent) => {
    onClick();

    event.stopPropagation();
  };

  return <Img src={icon} alt="세줄의 민족 아이콘" onClick={onClickIcon} />;
};

export default Icon;

const Img = styled.img`
  width: 25px;
  height: 25px;
  cursor: pointer;
`;

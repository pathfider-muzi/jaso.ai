import { ReactChild } from "react";
import * as S from "./styles";

interface Props {
  children: ReactChild;
  label: string;
  toolTipContent?: string;
}

const Field = ({ label, children, toolTipContent }: Props) => {
  return (
    <S.Frame>
      <S.Label>
        {label}
        {toolTipContent && (
          <S.ToolTip
            text={toolTipContent}
            textBubbleStyle={{
              left: "0",
              bottom: "2rem"
            }}
          />
        )}
      </S.Label>
      {children}
    </S.Frame>
  );
};

export default Field;
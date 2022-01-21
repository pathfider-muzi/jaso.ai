import { ChangeEventHandler, ReactNode } from "react";
import * as S from "./styles";

interface Props {
  text: string;
  children: ReactNode;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
}

const SelfIntroductionContent = ({ text, children, onChange, ...props }: Props) => {
  return (
    <>
      <S.Frame {...props}>
        <S.SpellErrorWrapper>{children}</S.SpellErrorWrapper>

        <S.TextArea
          value={text}
          onChange={onChange}
          placeholder="내용을 입력해주세요."
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
        />
      </S.Frame>
    </>
  );
};

export default SelfIntroductionContent;

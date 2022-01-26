import React, { ChangeEventHandler, MutableRefObject, ReactNode } from "react";
import * as S from "./styles";

interface Props {
  text: string;
  children: ReactNode;
  textareaRef: MutableRefObject<HTMLTextAreaElement | null>;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  maxLength: number;
}

const SelfIntroductionContent = ({ text, children, onChange, textareaRef, maxLength, ...props }: Props) => {
  return (
    <S.Frame {...props}>
      <S.SpellErrorWrapper>{children}</S.SpellErrorWrapper>

      <S.TextArea
        ref={textareaRef}
        value={text}
        onChange={onChange}
        placeholder="내용을 입력해주세요."
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        maxLength={maxLength}
      />
    </S.Frame>
  );
};

export default SelfIntroductionContent;

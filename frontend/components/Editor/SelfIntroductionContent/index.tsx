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
  const limitMaxLength = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const target = event.target as HTMLTextAreaElement;

    if (target.textLength > maxLength) {
      alert("글자수가 " + maxLength + "자 이하로 제한됩니다");
      target.textContent = target.textContent!.replace(target.textContent![maxLength], "");
    }
  };

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
        onKeyUp={limitMaxLength}
      />
    </S.Frame>
  );
};

export default SelfIntroductionContent;

import React, { ChangeEventHandler, ReactNode, UIEventHandler, useRef } from "react";
import * as S from "./styles";

interface Props {
  text: string;
  children: ReactNode;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  maxLength: number;
}

const SelfIntroductionContent = ({ text, children, onChange, maxLength, ...props }: Props) => {
  const spellErrorRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const onScrollTextArea: UIEventHandler<HTMLTextAreaElement> = event => {
    if (!spellErrorRef.current) return;
    if (!textAreaRef.current) return;

    const $textarea = event.target as HTMLTextAreaElement;

    spellErrorRef.current.scrollTop = $textarea.scrollTop;
  };

  return (
    <S.Frame {...props}>
      <S.SpellErrorWrapper ref={spellErrorRef}>{children}</S.SpellErrorWrapper>

      <S.TextArea
        value={text}
        ref={textAreaRef}
        onChange={onChange}
        placeholder="내용을 입력해주세요."
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        maxLength={maxLength}
        onScroll={onScrollTextArea}
      />
    </S.Frame>
  );
};

export default SelfIntroductionContent;

import React, { ChangeEventHandler, ReactNode, UIEventHandler, useEffect, useRef, useState } from "react";
import * as S from "./styles";

interface Props {
  text: string;
  children: ReactNode;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  maxLength: number;
}

const SelfIntroductionContent = ({ text, children, onChange, maxLength, ...props }: Props) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const spellErrorRef = useRef<HTMLDivElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [textAreaHeight, setTextAreaHeight] = useState(0);

  const onScrollTextArea: UIEventHandler<HTMLTextAreaElement> = event => {
    if (!spellErrorRef.current) return;
    if (!textAreaRef.current) return;

    const $textarea = event.target as HTMLTextAreaElement;

    spellErrorRef.current.scrollTop = $textarea.scrollTop;
  };

  useEffect(() => {
    if (!frameRef.current) return;

    setTextAreaHeight(frameRef.current.scrollHeight);
  }, []);

  return (
    <S.Frame ref={frameRef} {...props}>
      <S.SpellErrorWrapper styles={{ height: textAreaHeight }} ref={spellErrorRef}>
        {children}
      </S.SpellErrorWrapper>

      <S.TextArea
        styles={{ height: textAreaHeight }}
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

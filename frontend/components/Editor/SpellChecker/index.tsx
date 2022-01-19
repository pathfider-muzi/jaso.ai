import useSpellCheck from "@/components/Editor/SpellChecker/hooks/useSpellCheck";
import { setEditorContent } from "@/modules/editor/actions";
import Image from "next/image";
import { FormEventHandler, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import NAVER_SPELL_CHECK_RESULT_INFO from "./constants/naverSpellCheckResultInfo";
import * as S from "./styles";

interface Props {
  text?: string;
}

const SpellChecker = ({ text, ...props }: Props) => {
  const [input, setText] = useState(text || "");
  const dispatch = useDispatch();
  const {
    errorCount,
    fixedText,
    originalHTML,
    fixedHTML,
    refetch: getSpellCheck
  } = useSpellCheck({
    text: input
  });

  useEffect(() => {
    setText(text!);
  }, [text]);

  const onSubmit: FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    getSpellCheck();
  };

  const reflectOnEditor = () => {
    dispatch(setEditorContent(fixedText));
  };

  return (
    <S.Frame {...props}>
      <S.SpellCheckForm onSubmit={onSubmit}>
        <S.SummitButton type="submit">맞춤법 검사</S.SummitButton>
      </S.SpellCheckForm>
      <S.ResultArea>
        <S.Label>자소서 입력</S.Label>
        <S.OriginalText dangerouslySetInnerHTML={{ __html: originalHTML }} />
        <Image src="/down_arrow.png" width={20} height={30} alt="down arrow"></Image>
        <S.Label>맞춤법 교정 결과</S.Label>
        <S.FixedText placeholder="맞춤법 교정 결과" dangerouslySetInnerHTML={{ __html: fixedHTML }} />
      </S.ResultArea>
      <S.ReflectButton onClick={reflectOnEditor}>반영하기</S.ReflectButton>
      <S.ColorInfo>
        {Object.keys(NAVER_SPELL_CHECK_RESULT_INFO).map(key => {
          const colorInfo = key as keyof typeof NAVER_SPELL_CHECK_RESULT_INFO;
          const category = NAVER_SPELL_CHECK_RESULT_INFO[colorInfo].category;

          return (
            <S.LabeledText colorInfo={colorInfo} key={colorInfo}>
              {category}
            </S.LabeledText>
          );
        })}
      </S.ColorInfo>
    </S.Frame>
  );
};

export default SpellChecker;

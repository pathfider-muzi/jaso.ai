import TextContentArea from "@/components/Editor/IntroductionContentArea";
import VerticalStyle from "@/components/_common/VerticalStyle";
import { TextAreaStyle } from "@/constants/styles/textArea";
import { RootState } from "@/modules/rootReducer";
import { useState } from "react";
import { useSelector } from "react-redux";
import TitleTextArea from "../TitleTextArea";
import { SaveButton, WordCountedText } from "./styles";

interface Props {
  number: number;
}

const EditForm = (props: Props) => {
  const [wordCounted, setWordCounted] = useState(0);

  const countWord = (number: number) => setWordCounted(number);

  const contentOfEditor = useSelector((state: RootState) => state.introductionSpellCheckReducer.text);

  return (
    <VerticalStyle width={500}>
      <div>{props.number}</div>
      <TextAreaStyle height={50} placeholder="제목을 입력하세요." />
      <TitleTextArea height={200} placeholder="자소서 문항 제목을 입력하세요." />
      <TextContentArea
        onChange={countWord}
        height={500}
        defaultText={contentOfEditor}
        placeholder="자소서 내용을 입력하세요."
      />
      <WordCountedText>{wordCounted} / 1000</WordCountedText>
      <SaveButton>저장</SaveButton>
    </VerticalStyle>
  );
};

export default EditForm;

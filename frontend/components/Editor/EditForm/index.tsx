import TextArea from "@/components/_common/TextArea";
import VerticalStyle from "@/components/_common/VerticalStyle";
import { RootState } from "@/reduxFolder";
import { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { WordCountedText } from "./styles";

interface Props {
  number: number;
}

const EditForm = (props: Props) => {
  const [wordCounted, setWordCounted] = useState(0);

  const countWord = useCallback((number: number) => setWordCounted(number), []);
  const contentOfEditor = useSelector((state: RootState) => state.editorReducer.text);

  return (
    <VerticalStyle width={500}>
      <div>{props.number}</div>
      <TextArea height={50} placeholder="제목을 입력하세요." onChange={countWord}></TextArea>
      <TextArea onChange={countWord} height={200} placeholder="자소서 문항 제목을 입력하세요."></TextArea>
      <TextArea
        onChange={countWord}
        height={500}
        defaultText={contentOfEditor}
        placeholder="자소서 내용을 입력하세요. "
      ></TextArea>
      <WordCountedText>{wordCounted} / 1000</WordCountedText>
      <button>저장</button>
      <button>교정</button>
    </VerticalStyle>
  );
};

export default EditForm;

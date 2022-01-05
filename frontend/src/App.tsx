import styled from "@emotion/styled";
import * as React from "react";
import { useState } from "react";
import { executeModel } from "./api";
import useQuery from "./hooks/useQuery";

const App = () => {
  const [inputText, setInputText] = useState("");

  const {
    isLoading,
    data: summary,
    refetch: getSummary,
  } = useQuery({
    query: () => executeModel(inputText),
  });

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    getSummary();
  };

  const onChangeTextArea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(event.target.value);
  };

  return (
    <Frame>
      <Brand>세줄의! 민족</Brand>
      <VertexAlignContainer>
        <Form onSubmit={onSubmit}>
          <TextArea value={inputText} onChange={onChangeTextArea} />
          <SubmitButton type="submit">요약</SubmitButton>
        </Form>

        <Result>{isLoading ? "로딩중..." : summary}</Result>
      </VertexAlignContainer>
    </Frame>
  );
};

export default App;

const Frame = styled.div`
  width: 350px;
  height: 450px;
  border: 1px solid black;
  padding: 10px;
`;

const VertexAlignContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 5%;
  height: 80%;
`;

const Form = styled.form`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 70%;
  margin-bottom: 30px;
  resize: none;
  padding: 8px;
  border: 1px solid black;
  border-radius: 10px;
`;

const SubmitButton = styled.button`
  padding: 8px 12px;
  border-radius: 10px;
`;

const Brand = styled.div`
  width: fit-content;
  height: 33px;
`;

const Result = styled.div`
  width: 100%;
  height: 30%;
  border: 1px solid black;
  border-radius: 10px;
  padding: 0 5%;
`;

type SpeechBubbleProps = {
  isTop: boolean;
  isLeft: boolean;
  isRight: boolean;
  isDown: boolean;
};

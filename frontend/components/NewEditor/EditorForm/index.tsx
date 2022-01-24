import createQna from "@/api/createQna";
import deleteQna from "@/api/deleteQna";
import updateQna from "@/api/updateQna";
import updateSelfIntroduction from "@/api/updateSelfIntroduction";
import useInput from "@/hooks/useInput";
import useQnas from "@/hooks/useQnas";
import useSpellingCorrecter from "@/hooks/useSpellingCorrecter";
import useTextArea from "@/hooks/useTextArea";
import { SelfIntroduction } from "@/types/SelfIntroduction";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import * as S from "./styles";

interface Props {
  selfIntroduction: SelfIntroduction;
}

const EditorForm = ({ selfIntroduction, ...props }: Props) => {
  const qnaCreateMutation = useMutation(createQna);
  const qnaDeleteMutation = useMutation(deleteQna);
  const qnaUpdateMutation = useMutation(updateQna);
  const selfIntroductionUpdateMutation = useMutation(updateSelfIntroduction);

  const { input: title, onChangeInput: onChangeTitle } = useInput(selfIntroduction.title);
  const { data: qnaList, refetch: refetchQnaList } = useQnas({
    enabled: true,
    selfIntroductionId: selfIntroduction.id
  });

  const {
    input: question,
    setInput: setQuestion,
    onChangeInput: onChangeQuestion,
    textAreaRef: questionTextAreaRef
  } = useTextArea("");
  const {
    input: answer,
    setInput: setAnswer,
    onChangeInput: onChangeAnswer,
    textAreaRef: answerTextAreaRef
  } = useTextArea("");

  const { children } = useSpellingCorrecter({
    text: answer
  });

  const [selectedPageNumber, setSelectedPageNumber] = useState(1);

  const onClickPageMarkButton = (pageNum: number) => {
    setSelectedPageNumber(pageNum);
  };

  const onClickAddQnaButton = () => {
    qnaCreateMutation.mutate(
      {
        selfIntroductionId: selfIntroduction.id,
        question: "",
        answer: "",
        maxCount: 10000
      },
      {
        onSuccess: () => {
          refetchQnaList();
        }
      }
    );
  };

  const onClickRemoveQnaButton = () => {
    if (!qnaList) return;

    qnaDeleteMutation.mutate(
      {
        selfIntroductionId: selfIntroduction.id,
        qnaId: qnaList[selectedPageNumber - 1]?.id
      },
      {
        onSuccess: () => {
          refetchQnaList();
          setSelectedPageNumber(1);
        }
      }
    );
  };

  const onClickSaveButton = () => {
    if (!qnaList) return;
    const selectedQna = qnaList[selectedPageNumber - 1];

    selfIntroductionUpdateMutation.mutate(
      {
        id: selfIntroduction.id,
        title: title,
        organisationName: selfIntroduction.organisationName,
        role: selfIntroduction.role
      },
      {
        onSuccess: () => {
          qnaUpdateMutation.mutate(
            {
              id: selectedQna.id,
              question,
              answer,
              maxCount: selectedQna.maxCount,
              selfIntroductionId: selfIntroduction.id
            },
            {
              onSuccess: () => {
                refetchQnaList();
                alert("저장에 성공했습니다.");
              }
            }
          );
        }
      }
    );
  };

  useEffect(() => {
    if (!qnaList) return;

    setQuestion(qnaList[selectedPageNumber - 1].question);
    setAnswer(qnaList[selectedPageNumber - 1].answer);
  }, [qnaList, selectedPageNumber]);

  if (!qnaList) return null;
  return (
    <S.Frame {...props}>
      <S.PageMarksWrapper>
        {qnaList?.map((qna, index) => {
          return (
            <S.PageMarkButtonWrapper key={qna.id + index} active={index + 1 === selectedPageNumber}>
              <S.PageMarkButton type="button" onClick={() => onClickPageMarkButton(index + 1)}>
                {index + 1}
              </S.PageMarkButton>
            </S.PageMarkButtonWrapper>
          );
        })}

        <S.PageMarkButtonWrapper isOptionButton>
          <S.PageMarkButton type="button" onClick={onClickAddQnaButton}>
            {"+"}
          </S.PageMarkButton>
        </S.PageMarkButtonWrapper>
        <S.PageMarkButtonWrapper isOptionButton>
          <S.PageMarkButton type="button" onClick={onClickRemoveQnaButton} disabled={qnaList?.length === 1}>
            {"-"}
          </S.PageMarkButton>
        </S.PageMarkButtonWrapper>
      </S.PageMarksWrapper>

      <S.SelfIntroductionTitleWrapper>
        <S.SelfIntroductionTitle
          type="text"
          value={title}
          onChange={onChangeTitle}
          placeholder="자기소개서 제목 입력"
          required
        />
      </S.SelfIntroductionTitleWrapper>

      <S.QuestionWrapper>
        <S.Question
          value={question}
          onChange={onChangeQuestion}
          placeholder="문항 입력"
          required={true}
          ref={questionTextAreaRef}
        />
      </S.QuestionWrapper>

      <S.AnswerWrapper>
        <S.SelfIntroductionContent text={answer} onChange={onChangeAnswer} textareaRef={answerTextAreaRef}>
          {children}
        </S.SelfIntroductionContent>
      </S.AnswerWrapper>

      <S.Footer>
        <S.TextCount>
          글자수: {answer.length} / {qnaList[selectedPageNumber - 1].maxCount}
        </S.TextCount>
        <S.SaveButton onClick={onClickSaveButton}>저장</S.SaveButton>
      </S.Footer>
    </S.Frame>
  );
};

export default EditorForm;

import createQna from "@/api/createQna";
import deleteQna from "@/api/deleteQna";
import updateQna from "@/api/updateQna";
import updateSelfIntroduction from "@/api/updateSelfIntroduction";
import useInput from "@/hooks/useInput";
import useQnas from "@/hooks/useQnas";
import { SpellingCorrecterData } from "@/hooks/useSpellingCorrecter";
import { SelfIntroduction } from "@/types/SelfIntroduction";
import { ChangeEventHandler, MutableRefObject, RefObject, useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";
import * as S from "./styles";

const INITIAL_PAGE_NUMBER = 1;

interface Props {
  selfIntroduction: SelfIntroduction;
  question: string;
  answer: string;
  setQuestion: (value: string) => void;
  setAnswer: (value: string) => void;
  onChangeQuestion: ChangeEventHandler<HTMLTextAreaElement>;
  onChangeAnswer: ChangeEventHandler<HTMLTextAreaElement>;
  questionTextAreaRef: MutableRefObject<HTMLTextAreaElement | null>;
  answerTextAreaRef: MutableRefObject<HTMLTextAreaElement | null>;
  spellingCorrectorData: SpellingCorrecterData[];
  spellingResultsRefs: MutableRefObject<RefObject<HTMLSpanElement>[] | undefined>;
  originalSpellingData: string[];
}

const EditorForm = ({
  selfIntroduction,
  question,
  answer,
  setQuestion,
  setAnswer,
  onChangeQuestion,
  onChangeAnswer,
  questionTextAreaRef,
  answerTextAreaRef,
  spellingCorrectorData,
  spellingResultsRefs,
  originalSpellingData,
  ...props
}: Props) => {
  const qnaCreateMutation = useMutation(createQna);
  const qnaDeleteMutation = useMutation(deleteQna);
  const qnaUpdateMutation = useMutation(updateQna);
  const selfIntroductionUpdateMutation = useMutation(updateSelfIntroduction);

  const { input: title, onChangeInput: onChangeTitle } = useInput(selfIntroduction.title);
  const { data: qnaList, refetch: refetchQnaList } = useQnas({
    enabled: true,
    selfIntroductionId: selfIntroduction.id
  });

  const [selectedPageNumber, setSelectedPageNumber] = useState(INITIAL_PAGE_NUMBER);

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
          setSelectedPageNumber(INITIAL_PAGE_NUMBER);
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

  const [isEditable, setEditable] = useState(false);

  const textCountRef = useRef<HTMLSpanElement>(null);
  const changeMaxTextCount = (event: React.KeyboardEvent<HTMLSpanElement>) => {
    const target = event.target as HTMLSpanElement;

    if (event.key === "Enter") {
      event.preventDefault();

      const newMaxCount = parseInt(target.textContent!);
      if (newMaxCount <= 0) {
        alert("최대 글자 수는 최소 1글자 이상이어야 합니다.");
        return;
      }
      const selectedQna = qnaList![selectedPageNumber - 1];
      qnaUpdateMutation.mutate(
        {
          id: selectedQna.id,
          question,
          answer,
          maxCount: newMaxCount,
          selfIntroductionId: selfIntroduction.id
        },
        {
          onSuccess: () => {
            refetchQnaList();
            alert("최대 글자수가 변경되었습니다.");
          }
        }
      );

      textCountRef!.current!.blur();
      setEditable(false);
    }
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
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          required={true}
          ref={questionTextAreaRef}
        />
      </S.QuestionWrapper>

      <S.AnswerWrapper>
        <S.SelfIntroductionContent
          text={answer}
          onChange={onChangeAnswer}
          textareaRef={answerTextAreaRef}
          maxLength={qnaList[selectedPageNumber - 1].maxCount}
        >
          <>
            {spellingCorrectorData.map((spellingCorrecterResult, index) => {
              const element = (
                <span
                  key={spellingCorrecterResult.positionIndex + spellingCorrecterResult.fixedText}
                  ref={spellingResultsRefs.current?.[index]}
                  className={
                    spellingCorrecterResult.isCorrect
                      ? ""
                      : `error-color-${spellingCorrecterResult.errorInfo?.className}`
                  }
                  data-word-index={spellingCorrecterResult.positionIndex}
                >
                  {originalSpellingData[spellingCorrecterResult.positionIndex] + " "}
                </span>
              );

              return element;
            })}
          </>
        </S.SelfIntroductionContent>
      </S.AnswerWrapper>

      <S.Footer>
        <S.TextCountWrapper>
          글자수: {answer.length} /
          <S.TextCount
            onKeyDown={changeMaxTextCount}
            suppressContentEditableWarning={true}
            contentEditable={isEditable}
            ref={textCountRef}
          >
            {qnaList[selectedPageNumber - 1].maxCount}
          </S.TextCount>
          <S.ChangeTextCount
            onClick={() => {
              setEditable(true);
              textCountRef.current?.focus();
            }}
          >
            글자수 변경
          </S.ChangeTextCount>
        </S.TextCountWrapper>

        <S.SaveButton onClick={onClickSaveButton}>저장</S.SaveButton>
      </S.Footer>
    </S.Frame>
  );
};

export default EditorForm;

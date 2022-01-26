import useInput from "@/hooks/useInput";
import useQnas from "@/hooks/useQnas";
import useSelfIntroductions from "@/hooks/useSelfIntroductions";
import { SpellingCorrecterData } from "@/hooks/useSpellingCorrecter";
import { SelfIntroduction } from "@/types/SelfIntroduction";
import { ChangeEventHandler, MutableRefObject, RefObject, useEffect, useRef, useState } from "react";
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
  const {
    data: qnaList,
    refetch: refetchQnaList,
    deleteQna,
    creatQna,
    updateQna
  } = useQnas({
    enabled: true,
    selfIntroductionId: selfIntroduction.id
  });

  const [selectedPageNumber, setSelectedPageNumber] = useState(INITIAL_PAGE_NUMBER);
  const [isEditableTextCount, setIsEditableTextCount] = useState(false);
  const textCountRef = useRef<HTMLInputElement>(null);
  const { updateSelfIntroduction } = useSelfIntroductions({ enabled: false });
  const { input: title, onChangeInput: onChangeTitle } = useInput(selfIntroduction.title);
  const { input: textCountInput, setInput: setTextCount, onChangeInput: onChangeTextCountInput } = useInput("0");

  const onClickPageMarkButton = (pageNum: number) => {
    setSelectedPageNumber(pageNum);
  };

  const onClickAddQnaButton = () => {
    creatQna(
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

    deleteQna(
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

    updateSelfIntroduction(
      {
        id: selfIntroduction.id,
        title: title,
        organisationName: selfIntroduction.organisationName,
        role: selfIntroduction.role
      },
      {
        onSuccess: () => {
          updateQna(
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

  const onClickChangeTextCountButton = () => {
    if (!isEditableTextCount) {
      setIsEditableTextCount(true);

      return;
    }

    if (answer.length > Number(textCountInput)) {
      alert(`현재글자수 ${answer.length} 보다 높게 설정해야합니다.`);

      return;
    }

    updateQna(
      {
        id: qnaList[selectedPageNumber - 1].id,
        question,
        answer,
        maxCount: Number(textCountInput),
        selfIntroductionId: selfIntroduction.id
      },
      {
        onSuccess: () => {
          refetchQnaList();
          setIsEditableTextCount(false);
          alert("최대 글자수가 변경되었습니다.");
        }
      }
    );
  };

  useEffect(() => {
    if (qnaList.length === 0) return;

    setIsEditableTextCount(false);
    setQuestion(qnaList[selectedPageNumber - 1].question);
    setAnswer(qnaList[selectedPageNumber - 1].answer);
  }, [qnaList, selectedPageNumber]);

  useEffect(() => {
    if (isEditableTextCount) {
      textCountRef.current?.focus();
      setTextCount(`${qnaList[selectedPageNumber - 1]?.maxCount || 0}`);
    } else textCountRef.current?.blur();
  }, [textCountRef, isEditableTextCount]);

  if (qnaList.length === 0) return null;
  return (
    <S.Frame {...props}>
      <S.PageMarksWrapper>
        {qnaList.map((qna, index) => {
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
          maxLength={qnaList[selectedPageNumber - 1]?.maxCount}
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
          <span>{`글자수: ${answer.length} / `}</span>

          {isEditableTextCount ? (
            <S.TextCountInput
              type="number"
              value={textCountInput}
              onChange={onChangeTextCountInput}
              required
              min={0}
              max={answer.length}
              ref={textCountRef}
            />
          ) : (
            <S.TextCount>{qnaList[selectedPageNumber - 1].maxCount}</S.TextCount>
          )}

          <S.MaxCountChangeButton type="button" onClick={onClickChangeTextCountButton}>
            {isEditableTextCount ? "확인" : "변경"}
          </S.MaxCountChangeButton>
        </S.TextCountWrapper>

        <S.SaveButton onClick={onClickSaveButton}>저장</S.SaveButton>
      </S.Footer>
    </S.Frame>
  );
};

export default EditorForm;

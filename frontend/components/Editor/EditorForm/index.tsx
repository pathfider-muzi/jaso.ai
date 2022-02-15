import useInput from "@/hooks/useInput";
import useModal from "@/hooks/useModal";
import useQnas from "@/hooks/useQnas";
import useSelfIntroductions from "@/hooks/useSelfIntroductions";
import { SpellingCorrecterData } from "@/hooks/useSpellingCorrecter";
import { RootState } from "@/modules";
import {
  changeAlertState,
  changePageState,
  changeSavedState,
  setNextLink
} from "@/modules/confirmSaveIntroduction/actions";
import { changeQuestionTitleState } from "@/modules/recommendedAnswerOfQuestion/actions";
import { SelfIntroduction } from "@/types/SelfIntroduction";
import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEventHandler, MutableRefObject, RefObject, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ExportDropDown from "../ExportDropDown";
import PageMark from "../PageMark";
import UnSaveAlert from "../UnSaveAlert";
import useOrganizationName from "./hooks/useOrganizationName";
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

  const {
    isOrganizationHighlightChecked,
    isLoadingGetOrganizationName,
    onChangeOrganizationHighlightCheckBox,
    organizationNames
  } = useOrganizationName({
    answer
  });

  const [selectedPageNumber, setSelectedPageNumber] = useState(INITIAL_PAGE_NUMBER);
  const router = useRouter();

  const isIntroductionSaved = useSelector((state: RootState) => state.confirmSavingIntroductionReducer.isSaved);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(changePageState(true));
  }, []);

  useEffect(() => {
    router.beforePopState(({ as: nextLink }) => {
      if (nextLink !== router.asPath && isIntroductionSaved === false) {
        dispatch(setNextLink(nextLink));
        dispatch(changeAlertState(true));
        return false;
      }
      return true;
    });

    return () => {
      router.beforePopState(() => true);
    };
  }, [router, isIntroductionSaved, dispatch]);
  const [isEditableTextCount, setIsEditableTextCount] = useState(false);
  const textCountRef = useRef<HTMLInputElement>(null);
  const { updateSelfIntroduction } = useSelfIntroductions({ enabled: false });
  const { input: title, onChangeInput: onChangeTitle } = useInput(selfIntroduction.title);
  const { input: textCountInput, setInput: setTextCount, onChangeInput: onChangeTextCountInput } = useInput("0");

  const onClickPageMarkButton = (pageNum: number) => {
    dispatch(changeQuestionTitleState(qnaList[pageNum - 1].question));
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
          onClickPageMarkButton(INITIAL_PAGE_NUMBER);
          if (selectedPageNumber === INITIAL_PAGE_NUMBER) {
            dispatch(changeQuestionTitleState(qnaList[INITIAL_PAGE_NUMBER].question));
          }
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
    dispatch(changeSavedState(true));
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

  useEffect(() => {
    dispatch(changePageState(true));
  }, []);

  useEffect(() => {
    router.beforePopState(({ as: nextLink }) => {
      if (nextLink !== router.asPath && isIntroductionSaved === false) {
        dispatch(setNextLink(nextLink));
        dispatch(changeAlertState(true));
        return false;
      }
      return true;
    });

    return () => {
      router.beforePopState(() => true);
    };
  }, [router, isIntroductionSaved, dispatch]);

  const { isModalOpen: isExportButtonDropDownOpen, toggleModal: toggleExportButtonDropdown } = useModal({});
  return (
    <S.Frame {...props}>
      <S.PageMarksWrapper>
        {qnaList.map((qna, index) => {
          return (
            <PageMark
              key={qna.id}
              qnaId={qna.id}
              curIndex={index}
              selectedPageNumber={selectedPageNumber}
              onClickPageMarkButton={() => onClickPageMarkButton(index + 1)}
            ></PageMark>
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
          onChange={event => {
            onChangeQuestion(event);
            dispatch(changeQuestionTitleState(event.target.value));
          }}
          placeholder="문항 입력"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          required={true}
        />
      </S.QuestionWrapper>

      <S.AnswerWrapper>
        <S.SelfIntroductionContent
          text={answer}
          onChange={event => {
            onChangeAnswer(event);
            dispatch(changeSavedState(false));
          }}
          maxLength={qnaList[selectedPageNumber - 1]?.maxCount}
        >
          <>
            {spellingCorrectorData.map((spellingCorrecterResult, index) => {
              const word = originalSpellingData[spellingCorrecterResult.positionIndex];

              const detectedOrganizationName = organizationNames?.find(organizationName => {
                return word.includes(organizationName);
              });

              const spellingResultClassName = spellingCorrecterResult.isCorrect
                ? ""
                : `error-color-${spellingCorrecterResult.errorInfo?.className}`;

              const element = (
                <span
                  key={spellingCorrecterResult.positionIndex + spellingCorrecterResult.fixedText}
                  ref={spellingResultsRefs.current?.[index]}
                  className={spellingResultClassName}
                  data-word-index={spellingCorrecterResult.positionIndex}
                >
                  {detectedOrganizationName ? (
                    <span
                      dangerouslySetInnerHTML={{
                        __html: `${(word + " ").replaceAll(
                          detectedOrganizationName,
                          `<span class='organization-name'>${detectedOrganizationName}</span>`
                        )}`
                      }}
                    />
                  ) : (
                    <span>{word + " "}</span>
                  )}
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
            <S.TextCount>{qnaList[selectedPageNumber - 1]?.maxCount || 0}</S.TextCount>
          )}

          <S.MaxCountChangeButton type="button" onClick={onClickChangeTextCountButton}>
            {isEditableTextCount ? "확인" : "변경"}
          </S.MaxCountChangeButton>
        </S.TextCountWrapper>

        <S.Wrapper>
          <ExportDropDown
            currentQuestion={question}
            currentAnswer={answer}
            currentIndex={selectedPageNumber - 1}
            title={title}
            isOpen={isExportButtonDropDownOpen}
            onToggle={toggleExportButtonDropdown}
            qnas={qnaList}
          ></ExportDropDown>
          {isLoadingGetOrganizationName ? (
            <S.LoadingImageWrapper>
              <Image src="/loading.svg" alt="loading image" width="40" height="40" />
            </S.LoadingImageWrapper>
          ) : (
            <S.CheckBoxWithLabel
              isChecked={isOrganizationHighlightChecked}
              onChange={onChangeOrganizationHighlightCheckBox}
              text={"회사명 강조"}
            />
          )}

          <S.SaveButton onClick={onClickSaveButton}>저장</S.SaveButton>
        </S.Wrapper>
      </S.Footer>
      <UnSaveAlert saveIntroduction={onClickSaveButton}></UnSaveAlert>
    </S.Frame>
  );
};

export default EditorForm;

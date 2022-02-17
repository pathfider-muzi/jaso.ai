import _CustomAlert from "@/components/_common/CustomAlert";
import ToolTip from "@/components/_common/ToolTip";
import { MALGUN_FONT_BASE_64 } from "@/constants/fontBase64";
import useInput from "@/hooks/useInput";
import useQnas from "@/hooks/useQnas";
import useSelfIntroductions from "@/hooks/useSelfIntroductions";
import { SpellingCorrecterData } from "@/hooks/useSpellingCorrecter";
import useUser from "@/hooks/useUser";
import { RootState } from "@/modules";
import {
  changeAlertState,
  changePageState,
  changeSavedState,
  setNextLink
} from "@/modules/confirmSaveIntroduction/actions";
import { changeQuestionTitleState } from "@/modules/recommendedAnswerOfQuestion/actions";
import { SelfIntroduction } from "@/types/SelfIntroduction";
import jsPDF from "jspdf";
import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEventHandler, MutableRefObject, RefObject, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageMark from "../PageMark";
import PdfExportButton from "../PdfExportButton";
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
  const router = useRouter();

  const { user } = useUser({ enabled: false });

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

  const isIntroductionSaved = useSelector((state: RootState) => state.confirmSavingIntroductionReducer.isSaved);
  const dispatch = useDispatch();

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

  const [isSaveSuecceedAlertOpeneed, setSucceedOpened] = useState(false);

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
                setSucceedOpened(true);
                setTimeout(() => {
                  setSucceedOpened(false);
                }, 1000);
              }
            }
          );
        }
      }
    );
    dispatch(changeSavedState(true));
  };

  const [letterRangeAlert, setRangeAlert] = useState(false);
  const [maxRangeSucceed, setMaxRangeSucceed] = useState(false);

  const onClickChangeTextCountButton = () => {
    if (!isEditableTextCount) {
      setIsEditableTextCount(true);

      return;
    }

    if (answer.length > Number(textCountInput)) {
      setRangeAlert(true);
      setTimeout(() => {
        setRangeAlert(false);
      }, 1000);
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

          setMaxRangeSucceed(true);
          setTimeout(() => {
            setMaxRangeSucceed(false);
          }, 1000);
        }
      }
    );
  };

  const onClickPdfExportButton = () => {
    const newIntroduction = new jsPDF("p", "pt");
    newIntroduction.addFileToVFS("malgun.ttf", MALGUN_FONT_BASE_64);
    newIntroduction.addFont("malgun.ttf", "malgun", "normal");
    newIntroduction.setFont("malgun");
    newIntroduction.setFontSize(11);

    const qnasContent = qnaList.reduce((acc, curr, index) => {
      acc += `${index + 1}. ${curr.question}\n\n`;
      acc += `${curr.answer}\n\n`;

      return acc;
    }, "");

    const linebreakedContents = newIntroduction.splitTextToSize(qnasContent, 500);
    newIntroduction.text(linebreakedContents, 10, 10);
    newIntroduction.save(`${user?.nickname}_${title}_자기소개서.pdf`);
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

  return (
    <S.Frame {...props}>
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
          <div>
            <S.PdfExportButtonToolTip text="PDF로 다운로드" textBubbleStyle={{ top: "-3.5rem", left: "-2.5rem" }}>
              <PdfExportButton
                styles={{
                  width: 22,
                  height: 22
                }}
                onClickPdfExportButton={onClickPdfExportButton}
              />
            </S.PdfExportButtonToolTip>
          </div>

          {isLoadingGetOrganizationName ? (
            <S.LoadingImageWrapper>
              <Image src="/loading.svg" alt="loading image" width="40" height="40" />
            </S.LoadingImageWrapper>
          ) : (
            <S.OrganizationNameCheckWrapper>
              <S.CheckBoxWithLabel
                isChecked={isOrganizationHighlightChecked}
                onChange={onChangeOrganizationHighlightCheckBox}
                text={"회사명 강조"}
              />
              <ToolTip
                text="회사명으로 예상되는 단어에 하이라이팅 기능을 제공합니다. 지원하고자 하는 회사와 일치하는지 다시한번 확인해보세요."
                textBubbleStyle={{ top: "-5.5rem", left: "-25rem" }}
              />
            </S.OrganizationNameCheckWrapper>
          )}

          <S.SaveButton onClick={onClickSaveButton}>저장</S.SaveButton>
        </S.Wrapper>
      </S.Footer>

      <UnSaveAlert saveIntroduction={onClickSaveButton}></UnSaveAlert>
      <_CustomAlert
        title={`현재글자수 ${answer.length} 보다 높게 설정해야합니다.`}
        isOpened={letterRangeAlert}
        contentNode={<></>}
      />
      <_CustomAlert title={`최대 글자수가 변경되었습니다.`} isOpened={maxRangeSucceed} contentNode={<></>} />
      <_CustomAlert title="자소서 저장에 성공하셨습니다" isOpened={isSaveSuecceedAlertOpeneed} contentNode={<></>} />

      <S.PageMarksWrapper>
        {qnaList.map((qna, index) => {
          return (
            <PageMark
              key={qna.id}
              qnaId={qna.id}
              curIndex={index}
              selectedPageNumber={selectedPageNumber}
              onClickPageMarkButton={() => onClickPageMarkButton(index + 1)}
            />
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
    </S.Frame>
  );
};

export default EditorForm;

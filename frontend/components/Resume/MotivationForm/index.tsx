import ROUTE from "@/constants/routes";
import { useCopyButton } from "@/hooks/useCopyButton";
import useGenerateMotivation from "@/hooks/useGenerateMotivation";
import useInput from "@/hooks/useInput";
import useTextArea from "@/hooks/useTextArea";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Field from "../Field";
import * as S from "./styles";

const MIN_GENERATION_QUEUE_USER = 5;

interface Props {}

const MotivationForm = ({ ...props }: Props) => {
  const router = useRouter();

  const [resumeMotivationId, setResumeMotivationId] = useState(uuidv4());
  const { input: orgName, onChangeInput: onChangeOrgName } = useInput("");
  const { input: orgRole, onChangeInput: onChangeOrgRole } = useInput("");
  const { input: orgDetail, onChangeInput: onChangeOrgDetail } = useTextArea("");
  const { input: motivationEmphasis, onChangeInput: onChangeMotivationEmphasis } = useInput("");

  const [generateButtonClicked, setGenerateButtonClicked] = useState(false);

  const { refetchGenerateIntroduction, delayCount, motivationIntroduction } = useGenerateMotivation({
    enabled: false,
    doRefetch: generateButtonClicked,
    motivationInfo: {
      orgName,
      orgRole,
      orgDetail,
      motivationEmphasis: motivationEmphasis.split(",")
    },
    resumeMotivationId
  });

  const { isCopyButtonClicked, onCopy } = useCopyButton();

  const hasMotivationIntroduction = !!(motivationIntroduction && motivationIntroduction.trim().length > 0);

  useEffect(() => {
    if (hasMotivationIntroduction) setGenerateButtonClicked(false);
  }, [motivationIntroduction]);

  return (
    <S.Frame>
      <Field label="회사명">
        <S.TextInput
          value={orgName}
          onChange={onChangeOrgName}
          placeholder="영어보다는 한국어로, 약자보다는 전문으로 입력해주세요. ex) SR->삼성리서치, 금감원->금융감독원, kakaobrain->카카오브레인"
        />
      </Field>

      <Field label="직무">
        <S.TextInput value={orgRole} onChange={onChangeOrgRole} placeholder="ex) AI 서비스 개발자" />
      </Field>

      <Field
        label="회사 소개"
        toolTipContent="회사 소개는 본인이 직접작성하는 것보다 회사 홈페이지의 공식 소개를 가져와주세요."
      >
        <S.TextArea
          value={orgDetail}
          onChange={onChangeOrgDetail}
          placeholder="회사 소개는 본인이 직접작성하는 것보다 회사 홈페이지의 공식 소개를 가져와주세요."
        />
      </Field>

      <Field label="강조하고 싶은 동기" toolTipContent="강조하고 싶은 지원동기를 키워드로 ','로 구별하여 작성해주세요.">
        <S.TextInput
          value={motivationEmphasis}
          onChange={onChangeMotivationEmphasis}
          placeholder="구체적으로 입력하시면 더 좋은 생성 결과가 나옵니다 ex) AI 개발 능력, 고객 중심 사고, 개발자로서 성장, 회사의 성장 가능성"
        />
      </Field>

      <S.Line />

      <Field
        label="AI 지원동기 생성결과"
        toolTipContent={
          "위 정보를 바탕으로 지원동기 내용을 생성할 수 있습니다.\n• 현재 AI 자기소개서 생성 서버가 불안정하여 서비스 사용에 제한이 생길 수 있습니다.\n"
        }
      >
        <S.IntroductionContentWrapper>
          <S.IntroductionGenerateButton
            onClick={() => {
              refetchGenerateIntroduction();
              setGenerateButtonClicked(true);
            }}
            disabled={generateButtonClicked}
            isFetched={hasMotivationIntroduction}
          >
            {"지원동기 생성"}
          </S.IntroductionGenerateButton>

          {generateButtonClicked ? (
            <S.LoadingImageWrapper>
              <Image src="/loading.svg" alt="loading image" width="30" height="30" />
              <S.TextContentWrapper>
                <S.TextContent>
                  {
                    "• 위 정보를 바탕으로 지원동기 내용을 생성할 수 있습니다.\n• 현재 AI 자기소개서 생성 서버가 불안정하여 서비스 사용에 제한이 생길 수 있습니다.\n• 구체적으로 입력하시면 더 좋은 생성 결과가 나옵니다.\n"
                  }
                </S.TextContent>

                <S.TextContent>
                  {delayCount ? (
                    <>
                      <span>{delayCount === MIN_GENERATION_QUEUE_USER ? "최대 " : ""}</span>
                      <S.HighLightText>{delayCount}</S.HighLightText>

                      <span>명의 사용자가 이용중입니다.</span>

                      <span>{delayCount === MIN_GENERATION_QUEUE_USER ? " 최대 " : " 약 "}</span>
                      <S.HighLightText>{Math.ceil((delayCount * 53) / 60)}</S.HighLightText>
                      <span>분</span>
                      <S.HighLightText>{Math.ceil((delayCount * 53) % 60)}</S.HighLightText>
                      <span>초</span>
                      <span>의 시간이 소요됩니다.</span>
                    </>
                  ) : (
                    <></>
                  )}
                </S.TextContent>
              </S.TextContentWrapper>
            </S.LoadingImageWrapper>
          ) : (
            <S.ResultWrapper>
              <S.TextContent>{motivationIntroduction}</S.TextContent>
              {hasMotivationIntroduction && (
                <S.ResultButtonWrapper>
                  <S.CopyButton
                    onClick={() => {
                      if (motivationIntroduction) {
                        onCopy(motivationIntroduction);
                      }
                    }}
                  >
                    {isCopyButtonClicked ? "Copied" : "Copy"}
                  </S.CopyButton>
                  <S.GoToEditorButton
                    onClick={() => {
                      if (motivationIntroduction) {
                        onCopy(motivationIntroduction);
                      }

                      router.push(ROUTE.MY_SELFINTRODUCTIONS);
                    }}
                  >
                    자기소개서 작성하러 가기
                  </S.GoToEditorButton>
                </S.ResultButtonWrapper>
              )}
            </S.ResultWrapper>
          )}
        </S.IntroductionContentWrapper>
      </Field>
    </S.Frame>
  );
};

export default MotivationForm;

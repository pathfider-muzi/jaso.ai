import useGenerateMotivation from "@/hooks/useGenerateMotivation";
import useInput from "@/hooks/useInput";
import useTextArea from "@/hooks/useTextArea";
import Image from "next/image";
import Field from "../Field";
import * as S from "./styles";

const MotivationForm = () => {
  const { input: orgName, onChangeInput: onChangeOrgName } = useInput("");
  const { input: orgRole, onChangeInput: onChangeOrgRole } = useInput("");
  const { input: orgDetail, onChangeInput: onChangeOrgDetail } = useTextArea("");
  const { input: motivationEmphasis, onChangeInput: onChangeMotivationEmphasis } = useInput("");

  const {
    motivation,
    error,
    isFetching,
    isFetched,
    isRefetchError,
    refetch: refetchGenerateIntroduction
  } = useGenerateMotivation({
    enabled: false,
    motivationInfo: {
      orgName,
      orgRole,
      orgDetail,
      motivationEmphasis: motivationEmphasis.split(",")
    }
  });

  const isEveryInputFieldFilled = [orgName, orgRole, orgDetail, motivationEmphasis].every(inputValue => inputValue);

  return (
    <S.Frame>
      <Field label="회사명">
        <S.TextInput value={orgName} onChange={onChangeOrgName} placeholder="ex) 카카오브레인" />
      </Field>
      <Field label="직무">
        <S.TextInput value={orgRole} onChange={onChangeOrgRole} placeholder="ex) AI 서비스 개발자" />
      </Field>
      <Field label="회사 소개" toolTipContent="회사 정보를 입력해주세요. 회사 소개 홈페이지에 있는 것도 상관없습니다.">
        <S.TextArea
          value={orgDetail}
          onChange={onChangeOrgDetail}
          placeholder="ex) 카카오브레인은 AI 분야에서 선두를 달리고 있는 (주)카카오 계열사입니다."
        />
      </Field>
      <Field label="강조하고 싶은 동기" toolTipContent="강조하고 싶은 지원동기를 키워드로 ','로 구별하여 작성해주세요.">
        <S.TextInput
          value={motivationEmphasis}
          onChange={onChangeMotivationEmphasis}
          placeholder="ex) AI 개발 능력, 고객중심사고"
        />
      </Field>

      <S.Line />

      <Field
        label="AI 지원동기"
        toolTipContent={
          "위 정보를 바탕으로 지원동기 내용을 생성할 수 있습니다.\n• 자기소개서가 생성되는데 시간이 조금 걸릴 수 있습니다. 만약 잘 되지 않으면 잠시 후에 다시 시도해 주세요.\n• 정보는 영어보다는 한국어로, 약자보다는 전문으로 입력해주세요. ex) SR -> 삼성리서치, 금감원 -> 금융감독원\n•  현재 AI 자기소개서 생성 서버가 불안정하여 서비스 사용에 제한이 생길 수 있습니다."
        }
      >
        <S.IntroductionContentWrapper>
          <S.IntroductionGenerateButton
            onClick={() => refetchGenerateIntroduction()}
            disabled={isFetching || !isEveryInputFieldFilled}
          >
            {isFetched ? "재시도" : "생성"}
          </S.IntroductionGenerateButton>

          {error || isRefetchError ? (
            <S.TextContent>{"서버가 불안정합니다. 잠시후에 다시 시도해주세요"}</S.TextContent>
          ) : isFetching ? (
            <S.LoadingImageWrapper>
              <Image src="/loading.svg" alt="loading image" width="30" height="30" />
              <S.TextContent>
                {
                  "지원동기 문구를 생성중입니다. 잠시만 기다려주세요.\n• 자기소개서가 생성되는데 시간이 조금 걸릴 수 있습니다. 만약 잘 되지 않으면 잠시 후에 다시 시도해 주세요.\n• 정보는 영어보다는 한국어로, 약자보다는 전문으로 입력해주세요. ex) SR -> 삼성리서치, 금감원 -> 금융감독원\n• 현재 AI 자기소개서 생성 서버가 불안정하여 서비스 사용에 제한이 생길 수 있습니다."
                }
              </S.TextContent>
            </S.LoadingImageWrapper>
          ) : (
            <S.TextContent>{motivation}</S.TextContent>
          )}
        </S.IntroductionContentWrapper>
      </Field>
    </S.Frame>
  );
};

export default MotivationForm;

import LoginModal from "@/components/Auth/LoginModal";
import Field from "@/components/Resume/Field";
import { TERM_INPUT_VALIDATION } from "@/constants/validation";
import useGenerateIntroductionFromProject from "@/hooks/useGenerateIntroductionFromProject";
import useModal from "@/hooks/useModal";
import useProject from "@/hooks/useProject";
import useUser from "@/hooks/useUser";
import { Project } from "@/types/Project";
import Image from "next/image";
import * as S from "./styles";

interface Props extends Omit<ReturnType<typeof useProject>, "projects" | "mutation"> {
  id: Project["id"];
}

const ProjectInfoForm = ({
  id,
  projectNames,
  projectDetails,
  projectRoles,
  projectResults,
  projectFeelings,
  onChangeProjectNames,
  onChangeProjectDetails,
  onChangeProjectRoles,
  onChangeProjectResults,
  onChangeProjectFeelings,
  startYears,
  startMonths,
  endYears,
  endMonths,
  onChangeProjectTermStartYears,
  onChangeProjectTermStartMonths,
  onChangeProjectTermEndYears,
  onChangeProjectTermEndMonths,
  projectTerms
}: Props) => {
  const { user } = useUser({ enabled: false });

  const {
    introduction,
    error,
    isFetching,
    isFetched,
    isRefetchError,
    refetch: refetchGenerateIntroduction
  } = useGenerateIntroductionFromProject({
    project: {
      id,
      projectName: projectNames[id],
      projectTerm: projectTerms[id],
      projectDetail: projectDetails[id],
      projectRole: projectRoles[id],
      projectResult: projectResults[id],
      projectFeeling: projectFeelings[id]
    },
    enabled: false
  });

  const {
    isModalOpen: isLoginModalOpen,
    closeModal: closeLoginModal,
    openModal: openLoginModal
  } = useModal({
    defaultValue: false
  });

  const onClickGenerateButton = () => {
    if (user) {
      refetchGenerateIntroduction();
    } else {
      openLoginModal();
    }
  };

  return (
    <>
      <Field label="프로젝트명">
        <S.TextInput
          type="text"
          value={projectNames[id] || ""}
          onChange={onChangeProjectNames}
          placeholder="ex) 00 프로젝트"
          data-projectid={id}
        />
      </Field>

      <Field label="기간">
        <S.ProjectTerm>
          <S.YearInput
            type="number"
            placeholder="YYYY"
            min={TERM_INPUT_VALIDATION.RANGE.YEAR.MIN}
            max={TERM_INPUT_VALIDATION.RANGE.YEAR.MAX}
            maxLength={TERM_INPUT_VALIDATION.MAX_LENGTH.YEAR}
            value={startYears[id] || ""}
            onChange={onChangeProjectTermStartYears}
            data-projectid={id}
          />
          {"."}
          <S.MonthInput
            type="number"
            placeholder="MM"
            maxLength={TERM_INPUT_VALIDATION.MAX_LENGTH.MONTH}
            min={TERM_INPUT_VALIDATION.RANGE.MONTH.MIN}
            max={TERM_INPUT_VALIDATION.RANGE.MONTH.MAX}
            value={startMonths[id] || ""}
            onChange={onChangeProjectTermStartMonths}
            data-projectid={id}
          />

          <S.HyphenBetweenDate>{"-"}</S.HyphenBetweenDate>

          <S.YearInput
            type="number"
            placeholder="YYYY"
            maxLength={TERM_INPUT_VALIDATION.MAX_LENGTH.YEAR}
            min={TERM_INPUT_VALIDATION.RANGE.YEAR.MIN}
            max={TERM_INPUT_VALIDATION.RANGE.YEAR.MAX}
            value={endYears[id] || ""}
            onChange={onChangeProjectTermEndYears}
            data-projectid={id}
          />
          {"."}
          <S.MonthInput
            type="number"
            placeholder="MM"
            maxLength={TERM_INPUT_VALIDATION.MAX_LENGTH.MONTH}
            min={TERM_INPUT_VALIDATION.RANGE.MONTH.MIN}
            max={TERM_INPUT_VALIDATION.RANGE.MONTH.MAX}
            value={endMonths[id] || ""}
            onChange={onChangeProjectTermEndMonths}
            data-projectid={id}
          />
        </S.ProjectTerm>
      </Field>

      <Field label="설명">
        <S.TextArea
          value={projectDetails[id] || ""}
          onChange={onChangeProjectDetails}
          placeholder="ex) 취준생들에게 취업준비에 필요한 자기소개서, 이력서들을 관리하고 AI를 통해 추천/생성기능을 제공하는 프로젝트"
          data-projectid={id}
        />
      </Field>

      <Field label="역할" toolTipContent="프로젝트에서 본인이 맡은 역할을 ','로 구별하여 작성해주세요.">
        <S.TextArea
          value={projectRoles[id] || [""]}
          onChange={onChangeProjectRoles}
          placeholder="ex) 00에 대한 논문과 자료 수집, API개발, DB모델링, UI 개발, 테스팅"
          data-projectid={id}
        />
      </Field>

      <Field label="성과" toolTipContent="프로젝트에서 이룬 성과를 ','로 구별하여 작성해주세요.">
        <S.TextArea
          value={projectResults[id] || [""]}
          onChange={onChangeProjectResults}
          placeholder="ex) 대회에서 2등, 최우수상 수상, 성능 15%개선, MAU 1만"
          data-projectid={id}
        />
      </Field>

      <Field label="느낀점" toolTipContent="프로젝트에서 느낀점을 ','로 구별하여 작성해주세요.">
        <S.TextArea
          value={projectFeelings[id] || [""]}
          onChange={onChangeProjectFeelings}
          placeholder="ex) 개발을 우선적으로 생각한다해서 다른 것을 포기하는 것이 아닌 더 좋은 결과로 이끌어 낼 수 있다는 것을 느꼈다., 플랫폼 기획력에 따라 사용자의 수가 확연히 차이 난다는 것을 깨달았다."
          data-projectid={id}
        />
      </Field>

      <S.Line />

      <Field
        label="AI 자기소개서"
        toolTipContent={
          "위 프로젝트 경험을 바탕으로 자기소개서 내용을 생성할 수 있습니다.\n• 자기소개서가 생성되는데 시간이 조금 걸릴 수 있습니다.\n• 정보는 영어보다는 한국어로, 약자보다는 전문으로 입력해주세요. ex) SR -> 삼성리서치, 금감원 -> 금융감독원\n• 현재 AI 자기소개서 생성 서버가 불안정하여 서비스 사용에 제한이 생길 수 있습니다.\n👉  다시 시도하면 새로운 결과를 반환합니다. 결과가 마음에 들지 않는다면 재시도해주세요."
        }
      >
        <S.IntroductionContentWrapper>
          <S.IntroductionGenerateButton onClick={onClickGenerateButton} disabled={isFetching}>
            {isFetched ? "재시도" : "생성"}
          </S.IntroductionGenerateButton>

          {error || isRefetchError ? (
            <S.TextContent>{"서버가 불안정합니다. 잠시후에 다시 시도해주세요"}</S.TextContent>
          ) : isFetching ? (
            <S.LoadingImageWrapper>
              <Image src="/loading.svg" alt="loading image" width="30" height="30" />
              <S.TextContent>
                {
                  "자기소개문구를 생성중입니다. 잠시만 기다려주세요.\n• 자기소개서가 생성되는데 시간이 조금 걸릴 수 있습니다.\n• 정보는 영어보다는 한국어로, 약자보다는 전문으로 입력해주세요. ex) SR -> 삼성리서치, 금감원 -> 금융감독원\n• 현재 AI 자기소개서 생성 서버가 불안정하여 서비스 사용에 제한이 생길 수 있습니다.\n👉  다시 시도하면 새로운 결과를 반환합니다. 결과가 마음에 들지 않는다면 재시도해주세요."
                }
              </S.TextContent>
            </S.LoadingImageWrapper>
          ) : (
            <S.TextContent>{introduction}</S.TextContent>
          )}
        </S.IntroductionContentWrapper>
      </Field>
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </>
  );
};

export default ProjectInfoForm;

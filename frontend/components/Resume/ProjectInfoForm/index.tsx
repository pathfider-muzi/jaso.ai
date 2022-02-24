import LoginModal from "@/components/Auth/LoginModal";
import Field from "@/components/Resume/Field";
import { TERM_INPUT_VALIDATION } from "@/constants/validation";
import useGenerateIntroductionFromProject from "@/hooks/useGenerateIntroductionFromProject";
import useModal from "@/hooks/useModal";
import useProject from "@/hooks/useProject";
import useUser from "@/hooks/useUser";
import { Project } from "@/types/Project";
import Image from "next/image";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import * as S from "./styles";

const MIN_GENERATION_QUEUE_USER = 5;

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

  const [resumeProjectId, setResumeProjectId] = useState(uuidv4());

  const [generateButtonClicked, setGenerateButtonClicked] = useState(false);

  const { refetchGenerateIntroduction, delayCount, projectIntroduction } = useGenerateIntroductionFromProject({
    project: {
      id,
      projectName: projectNames[id],
      projectTerm: projectTerms[id],
      projectDetail: projectDetails[id],
      projectRole: projectRoles[id],
      projectResult: projectResults[id],
      projectFeeling: projectFeelings[id]
    },
    enabled: false,
    doRefetch: generateButtonClicked,
    resumeProjectId
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
      setGenerateButtonClicked(true);
    } else {
      openLoginModal();
    }
  };

  const hasProjectIntroduction = !!(projectIntroduction && projectIntroduction.trim().length > 0);

  useEffect(() => {
    if (hasProjectIntroduction) setGenerateButtonClicked(false);
  }, [projectIntroduction]);

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
        label="AI 프로젝트 경험 생성결과"
        toolTipContent={
          "위 정보를 바탕으로 지원동기 내용을 생성할 수 있습니다.\n• 현재 AI 자기소개서 생성 서버가 불안정하여 서비스 사용에 제한이 생길 수 있습니다.\n👉  다시 시도하면 새로운 결과를 반환합니다. 결과가 마음에 들지 않는다면 재시도해주세요."
        }
      >
        <S.IntroductionContentWrapper>
          <S.IntroductionGenerateButton
            onClick={onClickGenerateButton}
            disabled={generateButtonClicked}
            isFetched={hasProjectIntroduction}
          >
            {"프로젝트 경험 생성"}
          </S.IntroductionGenerateButton>

          {generateButtonClicked ? (
            <S.LoadingImageWrapper>
              <Image src="/loading.svg" alt="loading image" width="30" height="30" />
              <S.TextContentWrapper>
                <S.TextContent>
                  {
                    "위 정보를 바탕으로 지원동기 내용을 생성할 수 있습니다.\n👉  다시 시도하면 새로운 결과를 반환합니다. 결과가 마음에 들지 않는다면 재시도해주세요.\n• 현재 AI 자기소개서 생성 서버가 불안정하여 서비스 사용에 제한이 생길 수 있습니다.\n구체적으로 입력하시면 더 좋은 생성 결과가 나옵니다.\n"
                  }
                </S.TextContent>
                <S.TextContent>
                  {delayCount ? (
                    <>
                      <S.HighLightText>{delayCount}</S.HighLightText>
                      <span>명의 사용자가 이용중입니다.</span>
                      <span> 약 </span>
                      <S.HighLightText>{Math.ceil((delayCount * 53) / 60)}</S.HighLightText>
                      <span>분의 시간이 소요됩니다.</span>
                    </>
                  ) : (
                    <></>
                  )}
                </S.TextContent>
              </S.TextContentWrapper>
            </S.LoadingImageWrapper>
          ) : (
            <S.TextContent>{projectIntroduction}</S.TextContent>
          )}
        </S.IntroductionContentWrapper>
      </Field>
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </>
  );
};

export default ProjectInfoForm;

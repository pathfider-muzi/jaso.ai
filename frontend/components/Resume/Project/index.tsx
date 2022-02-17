import Field from "@/components/Resume/Field";
import useGenerateIntroductionFromProject from "@/hooks/useGenerateIntroductionFromProject";
import useInput from "@/hooks/useInput";
import useTextArea from "@/hooks/useTextArea";
import { Project as ProjectType } from "@/types/Project";
import { useProjectTerm } from "./hooks/useProjectTerm";
import * as S from "./styles";

interface Props {
  project: Pick<
    ProjectType,
    "projectDetail" | "projectFeeling" | "projectName" | "projectResult" | "projectRole" | "projectTerm"
  >;
}

const Project = ({
  project: { projectDetail, projectFeeling, projectName, projectResult, projectRole, projectTerm },
  ...props
}: Props) => {
  const { input: projectNameInput, onChangeInput: onChangeProjectName } = useInput(projectName);

  const {
    projectTermYearStartInput,
    projectTermMonthStartInput,
    projectTermYearEndInput,
    projectTermMonthEndInput,
    onChangeProjectTermYearStart,
    onChangeProjectTermMonthStart,
    onChangeProjectTermYearEnd,
    onChangeProjectTermMonthEnd
  } = useProjectTerm(projectTerm);

  const { input: projectDetailInput, onChangeInput: onChangeProjectDetail } = useTextArea(projectDetail);

  const { input: projectRoleInput, onChangeInput: onChangeProjectRole } = useTextArea(projectRole.join(", "));

  const { input: projectResultInput, onChangeInput: onChangeProjectResult } = useTextArea(projectResult.join(", "));

  const { input: projectFeelingInput, onChangeInput: onChangeProjectFeeling } = useTextArea(projectFeeling.join(", "));

  const {
    introduction,
    error,
    isLoading,
    refetch: refetchGenerateIntroduction
  } = useGenerateIntroductionFromProject({
    project: {
      projectName: projectNameInput,
      projectTerm: `${projectTermYearStartInput}.${projectTermMonthStartInput}-${projectTermYearEndInput}.${projectTermMonthEndInput}`,
      projectDetail: projectDetailInput,
      projectRole: projectRoleInput.split(", "),
      projectResult: projectResultInput.split(", "),
      projectFeeling: projectFeelingInput.split(", ")
    },
    enabled: false
  });

  return (
    <S.Frame {...props}>
      <S.DeleteButton type="button" onClick={() => {}}>
        {"×"}
      </S.DeleteButton>

      <Field label="프로젝트명">
        <S.TextInput
          type="text"
          value={projectNameInput}
          onChange={onChangeProjectName}
          placeholder="ex) 00 프로젝트"
        />
      </Field>

      <Field label="기간">
        <S.ProjectTerm>
          <S.YearInput
            type="number"
            placeholder="YYYY"
            maxLength={4}
            value={projectTermYearStartInput}
            onChange={onChangeProjectTermYearStart}
          />
          {"."}
          <S.MonthInput
            type="number"
            placeholder="MM"
            maxLength={2}
            value={projectTermMonthStartInput}
            onChange={onChangeProjectTermMonthStart}
          />
          <S.HyphenBetweenDate>{"-"}</S.HyphenBetweenDate>
          <S.YearInput
            type="number"
            placeholder="YYYY"
            maxLength={4}
            value={projectTermYearEndInput}
            onChange={onChangeProjectTermYearEnd}
          />
          {"."}

          <S.MonthInput
            type="number"
            placeholder="MM"
            maxLength={2}
            value={projectTermMonthEndInput}
            onChange={onChangeProjectTermMonthEnd}
          />
        </S.ProjectTerm>
      </Field>

      <Field label="설명">
        <S.TextArea
          value={projectDetailInput}
          onChange={onChangeProjectDetail}
          placeholder="ex) 취준생들에게 취업준비에 필요한 자기소개서, 이력서들을 관리하고 AI를 통해 추천/생성기능을 제공하는 프로젝트"
        />
      </Field>

      <Field label="역할" toolTipContent="프로젝트에서 본인이 맡은 역할을 ','로 구별하여 작성해주세요.">
        <S.TextArea
          value={projectRoleInput}
          onChange={onChangeProjectRole}
          placeholder="ex) 00에 대한 논문과 자료 수집, API개발, DB모델링, UI 개발, 테스팅"
        />
      </Field>

      <Field label="성과" toolTipContent="프로젝트에서 이룬 성과를 ','로 구별하여 작성해주세요.">
        <S.TextArea
          value={projectResultInput}
          onChange={onChangeProjectResult}
          placeholder="ex) 대회에서 2등, 최우수상 수상, 성능 15%개선"
        />
      </Field>

      <Field label="느낀점" toolTipContent="프로젝트에서 느낀점을 ','로 구별하여 작성해주세요.">
        <S.TextArea
          value={projectFeelingInput}
          onChange={onChangeProjectFeeling}
          placeholder="ex) 개발을 우선적으로 생각한다해서 다른 것을 포기하는 것이 아닌 더 좋은 결과로 이끌어 낼 수 있다는 것을 느꼈다., 플랫폼 기획력에 따라 사용자의 수가 확연히 차이 난다는 것을 깨달았다."
        />
      </Field>

      <Field
        label="자기소개서 생성"
        toolTipContent="위 프로젝트 경험을 바탕으로 자기소개서 내용을 생성할 수 있습니다. 시간이 몇 초 정도 소요됩니다."
      >
        <S.IntroductionContentWrapper>
          <S.IntroductionGenerateButton onClick={() => refetchGenerateIntroduction()}>
            생성
          </S.IntroductionGenerateButton>

          {isLoading ? (
            <S.LoadingImageWrapper>{"생성중입니다. 잠시만 기다려주세요..."}</S.LoadingImageWrapper>
          ) : (
            <S.TextContent>{introduction}</S.TextContent>
          )}
        </S.IntroductionContentWrapper>
      </Field>
    </S.Frame>
  );
};

export default Project;

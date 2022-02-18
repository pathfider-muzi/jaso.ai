import MotivationForm from "@/components/Resume/MotivationForm";
import ProjectInfoForm from "@/components/Resume/ProjectInfoForm";
import BRAND_NAME from "@/constants/brandName";
import useInput from "@/hooks/useInput";
import useResumeProjects from "@/hooks/useResumeProjects";
import useResumes from "@/hooks/useResumes";
import { Project as ProjectType } from "@/types/Project";
import { Resume } from "@/types/Resume";
import useProjectInput from "./hooks/useProjectInput";
import * as S from "./styles";

interface Props {
  resume: Resume;
}

const MyResume = ({ resume }: Props) => {
  const { input: resumeTitleInput, onChangeInput: onChangeResumeTitleInput } = useInput(resume.title);

  const { updateResume } = useResumes({ enabled: false });

  const { projects, createResumeProject, updateResumeProject, deleteResumeProject } = useResumeProjects({
    enabled: true,
    resumeId: resume.id
  });

  const projectInputs = useProjectInput({
    projects
  });

  const onClickSaveButton = () => {
    updateResume(
      {
        ...resume,
        title: resumeTitleInput
      },
      {
        onSettled: () => {
          Promise.allSettled(
            projects.map(({ id }) => {
              return updateResumeProject({
                id,
                resumeId: resume.id,
                projectName: projectInputs.projectNames[id],
                projectRole: projectInputs.projectRoles[id],
                projectDetail: projectInputs.projectDetails[id],
                projectFeeling: projectInputs.projectFeelings[id],
                projectResult: projectInputs.projectResults[id],
                projectTerm: projectInputs.projectTerms[id]
              });
            })
          ).then(() => {
            alert("저장이 완료되었습니다.");
          });
        }
      }
    );
  };

  const onClickProjectAddButton = () => {
    createResumeProject({
      resumeId: resume.id,
      project: {
        projectName: "",
        projectDetail: "",
        projectFeeling: [""],
        projectResult: [""],
        projectRole: [""],
        projectTerm: `${new Date().getFullYear()}.${new Date().getMonth()}-${new Date().getFullYear()}.${new Date().getMonth()}`
      }
    });
  };

  const onClickResumeProjectDeleteButton = (projectId: ProjectType["id"]) => {
    if (!confirm("정말 제거하시겠습니까?")) return;

    deleteResumeProject({
      resumeId: resume.id,
      projectId
    });
  };

  return (
    <S.Screen title="내 이력서" description={`내가 작성한 이력서, ${BRAND_NAME}`}>
      <S.Frame>
        <S.Header>
          <S.TitleInput type="text" value={resumeTitleInput} onChange={onChangeResumeTitleInput} />

          <S.ButtonsWrapper>
            <S.PdfExportButton
              styles={{
                width: 35,
                height: 35
              }}
              onClickPdfExportButton={() => {}}
            />
            <S.SaveButton onClick={onClickSaveButton}>저장</S.SaveButton>
          </S.ButtonsWrapper>
        </S.Header>

        <S.ResumeForm>
          <S.FieldName>지원동기</S.FieldName>
          <S.FieldGuide>
            {"• 지원하고자 하는 회사정보를 입력하고 지원동기를 생성해보세요."}
            <br />
            {"• 이 정보는 이력서 저장에 포함되지 않습니다."}
          </S.FieldGuide>

          <S.ResumeInfo>
            <MotivationForm />
          </S.ResumeInfo>

          <S.ResumeInfo>
            <S.FieldName>프로젝트</S.FieldName>
            <S.FieldGuide>
              {"• 본인이 경험한 프로젝트들을 입력해주세요."}
              <br />
              {"• 자기소개서 생성 정보는 이력서 저장에 포함되지 않습니다."}
            </S.FieldGuide>

            <S.ProjectAddButton type="button" onClick={onClickProjectAddButton}>
              {"+ 추가"}
            </S.ProjectAddButton>

            {projects.map(({ id }) => {
              return (
                <S.ProjectFormWrapper key={id}>
                  <S.DeleteButton type="button" onClick={() => onClickResumeProjectDeleteButton(id)}>
                    {"×"}
                  </S.DeleteButton>

                  <ProjectInfoForm id={id} {...projectInputs} />
                </S.ProjectFormWrapper>
              );
            })}
          </S.ResumeInfo>
        </S.ResumeForm>

        <S.ResumeLiveDemo></S.ResumeLiveDemo>
      </S.Frame>
    </S.Screen>
  );
};

export default MyResume;

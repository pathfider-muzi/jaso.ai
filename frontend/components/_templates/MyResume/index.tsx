import MotivationForm from "@/components/Resume/MotivationForm";
import ProjectInfoForm from "@/components/Resume/ProjectInfoForm";
import BRAND_NAME from "@/constants/brandName";
import useDebounce from "@/hooks/useDebounce";
import useInput from "@/hooks/useInput";
import useResumes from "@/hooks/useResumes";
import { Project as ProjectType } from "@/types/Project";
import { Resume } from "@/types/Resume";
import { useEffect } from "react";
import useProject from "./hooks/useProject";
import useResumePdfPreview from "./hooks/useResumePdfPreview";
import useResumePdfPreviewModal from "./hooks/useResumePdfPreviewModal";
import * as S from "./styles";

interface Props {
  resume: Resume;
}

const MyResume = ({ resume }: Props) => {
  const { isResumePdfPreviewOpen, toggleResumePdfPreview } = useResumePdfPreviewModal({
    resumeId: resume.id
  });

  const { input: resumeTitleInput, onChangeInput: onChangeResumeTitleInput } = useInput(resume.title);

  const { updateResume } = useResumes({ enabled: false });

  const {
    projects,
    mutation: { createResumeProject, updateResumeProject, deleteResumeProject },
    ...projectInput
  } = useProject({
    resumeId: resume.id
  });

  const { resumePdf, generatePdfFromResume, resumePreviewOffsetY } = useResumePdfPreview({
    resumeTitle: resumeTitleInput,
    projects
  });

  const onClickResumeSaveButton = () => {
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
                projectName: projectInput.projectNames[id],
                projectRole: projectInput.projectRoles[id],
                projectDetail: projectInput.projectDetails[id],
                projectFeeling: projectInput.projectFeelings[id],
                projectResult: projectInput.projectResults[id],
                projectTerm: projectInput.projectTerms[id]
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
    const emptyProject = {
      projectName: "",
      projectDetail: "",
      projectFeeling: [""],
      projectResult: [""],
      projectRole: [""],
      projectTerm: `${new Date().getFullYear()}.${new Date().getMonth()}-${new Date().getFullYear()}.${new Date().getMonth()}`
    };

    createResumeProject({
      resumeId: resume.id,
      project: emptyProject
    });
  };

  const onClickResumeProjectDeleteButton = (projectId: ProjectType["id"]) => {
    if (!confirm("정말 제거하시겠습니까?")) return;

    deleteResumeProject({
      resumeId: resume.id,
      projectId
    });
  };

  const onKeyUpResume = useDebounce({
    callback: () => {
      generatePdfFromResume();
    },
    delayMs: 2000
  });

  useEffect(() => {
    if (isResumePdfPreviewOpen) {
      generatePdfFromResume();
    }
  }, [isResumePdfPreviewOpen]);

  return (
    <S.Screen title="내 이력서" description={`내가 작성한 이력서, ${BRAND_NAME}`}>
      <S.Frame onKeyUp={onKeyUpResume}>
        <S.Header>
          <S.TitleInput type="text" value={resumeTitleInput} onChange={onChangeResumeTitleInput} />

          <S.ButtonsWrapper>
            <S.ResumePdfPreviewToggleButton
              onClick={() => {
                toggleResumePdfPreview();
              }}
            >
              {isResumePdfPreviewOpen ? "미리보기 닫기" : "미리보기"}
            </S.ResumePdfPreviewToggleButton>

            <S.SaveButton onClick={onClickResumeSaveButton}>저장</S.SaveButton>
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

                  <ProjectInfoForm id={id} {...projectInput} />
                </S.ProjectFormWrapper>
              );
            })}
          </S.ResumeInfo>
        </S.ResumeForm>
      </S.Frame>

      {isResumePdfPreviewOpen && (
        <S.ResumePdfPreviewWrapper>
          <S.ResumePdfPreview src={resumePdf} style={{ top: resumePreviewOffsetY }} />
        </S.ResumePdfPreviewWrapper>
      )}
    </S.Screen>
  );
};

export default MyResume;

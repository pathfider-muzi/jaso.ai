import MotivationForm from "@/components/Resume/MotivationForm";
import ProjectInfoForm from "@/components/Resume/ProjectInfoForm";
import BRAND_NAME from "@/constants/brandName";
import useDebounce from "@/hooks/useDebounce";
import useInput from "@/hooks/useInput";
import useProject from "@/hooks/useProject";
import useResumePdfPreview from "@/hooks/useResumePdfPreview";
import useResumePdfPreviewModal from "@/hooks/useResumePdfPreviewModal";
import useResumes from "@/hooks/useResumes";
import { Project as ProjectType } from "@/types/Project";
import { Resume as ResumeType } from "@/types/Resume";
import { useEffect } from "react";
import * as S from "./styles";

interface Props {
  resume: ResumeType;
}

const Resume = ({ resume }: Props) => {
  const { isResumePdfPreviewOpen, toggleResumePdfPreview } = useResumePdfPreviewModal();

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
    <S.Screen title="자기소개서 생성" description={`자기소개서를 생성해보세요., ${BRAND_NAME}`}>
      <S.Frame onKeyUp={onKeyUpResume}>
        <S.Header>
          <S.TitleInput type="text" defaultValue={"AI가 자기소개서를 생성해드립니다."} readOnly />

          <S.ButtonsWrapper>
            <S.ResumePdfPreviewToggleButton
              onClick={() => {
                toggleResumePdfPreview();
              }}
            >
              {isResumePdfPreviewOpen ? "PDF 미리보기 닫기" : "PDF 미리보기"}
            </S.ResumePdfPreviewToggleButton>

            <S.SaveButton onClick={onClickResumeSaveButton}>저장</S.SaveButton>
          </S.ButtonsWrapper>
        </S.Header>
        <S.ResumeForm>
          <S.FieldName>{"지원동기"}</S.FieldName>
          <S.FieldGuide>
            {"• 지원하고자 하는 회사정보를 입력하고 지원동기를 생성해보세요."}
            <br />
            {
              "• 영어보다는 한국어로, 약자보다는 전문으로 입력해주세요. ex) SR->삼성리서치, 금감원->금융감독원, kakaobrain->카카오브레인"
            }
            <br />
            {"• 회사 소개는 본인이 직접작성하는 것보다 회사 홈페이지의 공식 소개를 가져와주세요."}
            <br />
            {"• 결과가 마음에 들지 않는 경우 다시시도하여 새로운 결과를 받을 수 있습니다."}
          </S.FieldGuide>

          <S.ResumeInfo>
            <MotivationForm />
          </S.ResumeInfo>

          <S.ResumeInfo>
            <S.FieldName>{"프로젝트 경험"}</S.FieldName>
            <S.FieldGuide>
              {"• 본인이 경험한 프로젝트들을 입력해주세요."}
              <br />
              {"• 자기소개서 생성 정보는 이력서 저장에 포함되지 않습니다."}
              <br />
              {"• 결과가 마음에 들지 않는 경우 다시시도하여 새로운 결과를 받을 수 있습니다."}
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

export default Resume;

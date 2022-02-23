import LoginModal from "@/components/Auth/LoginModal";
import MotivationForm from "@/components/Resume/MotivationForm";
import ProjectInfoForm from "@/components/Resume/ProjectInfoForm";
import BRAND_NAME from "@/constants/brandName";
import useDebounce from "@/hooks/useDebounce";
import useInput from "@/hooks/useInput";
import useModal from "@/hooks/useModal";
import useResumePdfPreview from "@/hooks/useResumePdfPreview";
import useResumePdfPreviewModal from "@/hooks/useResumePdfPreviewModal";
import { Project, Project as ProjectType } from "@/types/Project";
import { useEffect, useState } from "react";
import useDummyProject from "./hooks/useDummyProject";
import * as S from "./styles";

interface Props {}

const AnyOneResume = ({ ...props }: Props) => {
  const { isResumePdfPreviewOpen, toggleResumePdfPreview } = useResumePdfPreviewModal();

  const { input: resumeTitleInput, onChangeInput: onChangeResumeTitleInput } =
    useInput("AI를 통해 지원동기를 생성해보세요!");

  const [dummyProjects, setDummyProjects] = useState<Project[]>(() => {
    const emptyProject: Project = {
      id: 1,
      createdDate: "",
      updatedDate: "",
      projectName: "",
      projectDetail: "",
      projectFeeling: [""],
      projectResult: [""],
      projectRole: [""],
      projectTerm: `${new Date().getFullYear()}.${new Date().getMonth()}-${new Date().getFullYear()}.${new Date().getMonth()}`
    };

    return [emptyProject];
  });

  const { projects, ...projectInput } = useDummyProject({
    projects: dummyProjects
  });

  const { resumePdf, generatePdfFromResume, resumePreviewOffsetY } = useResumePdfPreview({
    resumeTitle: resumeTitleInput,
    projects
  });

  const {
    isModalOpen: isLoginModalOpen,
    closeModal: closeLoginModal,
    openModal: openLoginModal
  } = useModal({
    defaultValue: false
  });

  const onClickResumeSaveButton = () => {
    openLoginModal();
  };

  const onClickProjectAddButton = () => {
    const emptyProject: Project = {
      id: dummyProjects.length + 1,
      createdDate: "",
      updatedDate: "",
      projectName: "",
      projectDetail: "",
      projectFeeling: [""],
      projectResult: [""],
      projectRole: [""],
      projectTerm: `${new Date().getFullYear()}.${new Date().getMonth()}-${new Date().getFullYear()}.${new Date().getMonth()}`
    };

    setDummyProjects(state => {
      return [...state, emptyProject];
    });
  };

  const onClickResumeProjectDeleteButton = (projectId: ProjectType["id"]) => {
    if (!confirm("정말 제거하시겠습니까?")) return;

    setDummyProjects(state => {
      return state.filter(project => project.id !== projectId);
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
      <S.Frame onKeyUp={onKeyUpResume} {...props}>
        <S.Header>
          <S.TitleInput
            type="text"
            value={resumeTitleInput}
            onChange={onChangeResumeTitleInput}
            placeholder="이력서 제목"
          />

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

      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </S.Screen>
  );
};

export default AnyOneResume;

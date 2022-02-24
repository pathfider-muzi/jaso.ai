import LoginModal from "@/components/Auth/LoginModal";
import MotivationForm from "@/components/Resume/MotivationForm";
import ProjectInfoForm from "@/components/Resume/ProjectInfoForm";
import BRAND_NAME from "@/constants/brandName";
import useInput from "@/hooks/useInput";
import useModal from "@/hooks/useModal";
import { Project } from "@/types/Project";
import { useState } from "react";
import useDummyProject from "./hooks/useDummyProject";
import * as S from "./styles";

interface Props {}

const GuestResume = ({ ...props }: Props) => {
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

  return (
    <S.Screen title="자기소개서 생성" description={`자기소개서를 생성해보세요., ${BRAND_NAME}`}>
      <S.Frame {...props}>
        <S.Header>
          <S.TitleInput type="text" defaultValue={"AI가 자기소개서를 생성해드립니다."} readOnly />

          <S.ButtonsWrapper>
            <S.ResumePdfPreviewToggleButton
              onClick={() => {
                openLoginModal();
              }}
            >
              {"미리보기"}
            </S.ResumePdfPreviewToggleButton>

            <S.SaveButton onClick={onClickResumeSaveButton}>저장</S.SaveButton>
          </S.ButtonsWrapper>
        </S.Header>
        <S.ResumeForm>
          <S.FieldName>{"지원동기"}</S.FieldName>
          <S.FieldGuide>
            {"• 지원하고자 하는 회사정보를 입력하고 지원동기를 생성해보세요."}
            <br />
            {"• 이 정보는 이력서 저장에 포함되지 않습니다."}
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
              {"• 프로젝트 생성을 위해서는 회원가입이 필요합니다."}
              <S.SignUpButton
                type="button"
                onClick={() => {
                  openLoginModal();
                }}
              >
                회원가입
              </S.SignUpButton>
            </S.FieldGuide>

            {projects.map(({ id }) => {
              return (
                <S.ProjectFormWrapper key={id} onFocus={openLoginModal}>
                  <ProjectInfoForm id={id} {...projectInput} />
                </S.ProjectFormWrapper>
              );
            })}
          </S.ResumeInfo>
        </S.ResumeForm>
      </S.Frame>

      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
    </S.Screen>
  );
};

export default GuestResume;

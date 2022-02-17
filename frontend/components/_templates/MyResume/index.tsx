import Project from "@/components/Resume/Project";
import BRAND_NAME from "@/constants/brandName";
import useInput from "@/hooks/useInput";
import { Resume } from "@/types/Resume";
import * as S from "./styles";

interface Props {
  resume: Resume;
}

const MyResume = ({ resume }: Props) => {
  const { input: resumeTitleInput, onChangeInput: onChangeResumeTitleInput } = useInput("이력서 제목");

  const project = [
    {
      projectName: "부동산 이상 탐지 모델링",
      projectDetail: "파이썬 모듈을 이용한 부동산 이상 탐지 모델링",
      projectTerm: "2020.7-2020.8",
      projectRole: ["모델링", "API 개발", "DB 설계"],
      projectResult: ["대회 2등 수상"],
      projectFeeling: ["모델링에 있어서 편향되지 않은 데이터의 중요성", "다른 개발자와의 협업의 중요성"]
    }
  ];

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
            <S.SaveButton>저장</S.SaveButton>
          </S.ButtonsWrapper>
        </S.Header>

        <S.ResumeForm>
          <S.ResumeInfo>
            <S.FieldName>프로젝트</S.FieldName>
            <S.FieldGuide>{"• 본인이 경험한 프로젝트들을 입력해주세요."}</S.FieldGuide>

            <S.ProjectAddButton type="button">{"+ 추가"}</S.ProjectAddButton>

            <Project project={project[0]} />
          </S.ResumeInfo>
        </S.ResumeForm>

        <S.ResumeLiveDemo></S.ResumeLiveDemo>
      </S.Frame>
    </S.Screen>
  );
};

export default MyResume;

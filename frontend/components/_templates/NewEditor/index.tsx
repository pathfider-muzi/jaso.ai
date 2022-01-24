import BRAND_NAME from "@/constants/brandName";
import { SelfIntroduction } from "@/types/SelfIntroduction";
import * as S from "./styles";

interface Props {
  selfIntroduction: SelfIntroduction;
}

const NewEditor = ({ selfIntroduction }: Props) => {
  return (
    <S.Screen title="에디터" description={`AI 자소서 assistant, ${BRAND_NAME} 에디터`}>
      <S.Frame>
        <S.EditorForm selfIntroduction={selfIntroduction} />
        <S.EditorSidebar />
      </S.Frame>
    </S.Screen>
  );
};

export default NewEditor;

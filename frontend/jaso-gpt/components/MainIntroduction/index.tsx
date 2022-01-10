import Link from "next/link";
import * as S from "./styles";

const MainIntroduction = () => {
  return (
    <S.Frame>
      <S.Title>AI 자소서 Assistant</S.Title>

      <S.Description>
        카카오브레인의 [koGPT]가 당신의 자기소개서 작성을 도와드립니다
      </S.Description>

      <Link href="/editor" passHref={true}>
        <S.Button>
          <span>Get Start &rarr;</span>
        </S.Button>
      </Link>
    </S.Frame>
  );
};

export default MainIntroduction;

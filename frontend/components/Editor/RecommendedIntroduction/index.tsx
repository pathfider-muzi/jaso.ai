import { RecommendedIntroductionType } from "@/types/RecommendedIntroduction";
import * as S from "./styles";

interface Props extends RecommendedIntroductionType {}

const RecommendedIntroduction = ({ title, body, tags }: Props) => {
  return (
    <S.Frame>
      <S.Header>
        <S.Title>{title}</S.Title>
      </S.Header>

      <S.ContentWrapper>
        <S.Content>{body}</S.Content>
      </S.ContentWrapper>

      <S.Footer>
        {tags.map(tag => {
          return <S.Tag key={tag}>{tag}</S.Tag>;
        })}
      </S.Footer>
    </S.Frame>
  );
};

export default RecommendedIntroduction;

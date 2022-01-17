import * as S from "./styles";

interface Props {
  label: string;
  textContent: string;
}

const TosContent = ({ label, textContent }: Props) => {
  return (
    <S.Frame>
      <S.Label>{label}</S.Label>
      <S.Content>{textContent}</S.Content>
    </S.Frame>
  );
};

export default TosContent;

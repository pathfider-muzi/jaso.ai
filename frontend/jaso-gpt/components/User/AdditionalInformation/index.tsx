import * as S from "./styles";

interface Props {
  label: string;
  value: string;
}

const AdditionalInformation = ({ label, value }: Props) => {
  return (
    <S.Frame>
      <S.Label>{label}</S.Label>
      <span>{value}</span>
    </S.Frame>
  );
};

export default AdditionalInformation;

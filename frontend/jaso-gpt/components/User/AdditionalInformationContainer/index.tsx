import AdditionalInformation from "../AdditionalInformation";
import * as S from "./styles";

const AdditionalInformationContainer = () => {
  return (
    <S.Frame>
      <S.Title>추가정보</S.Title>
      <S.InfoList>
        <AdditionalInformation label="직군" value="개발" />
        <AdditionalInformation label="직무" value="프론트엔드" />
        <AdditionalInformation label="경력" value="신입" />
        <AdditionalInformation label="현재 연봉" value="x,000만원" />
      </S.InfoList>
    </S.Frame>
  );
};

export default AdditionalInformationContainer;

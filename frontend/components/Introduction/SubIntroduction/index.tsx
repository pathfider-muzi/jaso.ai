import SERVICE_KEYWORD from "@/constants/serviceKeyword";
import * as S from "./styles";

const SubIntroduction = ({ ...props }) => {
  return (
    <S.Frame {...props}>
      {SERVICE_KEYWORD.map(keyword => {
        return (
          <S.Text key={keyword} keyword={keyword}>
            {keyword}
          </S.Text>
        );
      })}
    </S.Frame>
  );
};

export default SubIntroduction;

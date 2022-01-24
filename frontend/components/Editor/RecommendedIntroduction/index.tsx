import HorizontalStyle from "@/components/_common/HorizontalStyle";
import VerticalStyle from "@/components/_common/VerticalStyle";
import LOCAL_STORAGE_KEY from "@/constants/localStorageKeys";
import { RecommendedIntroductionType } from "@/types/RecommendedIntroduction";
import { getLocalStorage } from "@/utils/localStorage";
import splitByStep from "@/utils/splitByStep";
import { Frame, Introduction, IntroductionTitle, SpecTag } from "./styles";

const RecommendedIntroduction = ({ body, title, tags }: RecommendedIntroductionType) => {
  const TAG_NUMBER_BY_LINE = 3;

  return (
    <Frame width={500} isLoginned={getLocalStorage(LOCAL_STORAGE_KEY.ACCESS_TOKEN) != undefined} minHeight={500}>
      <IntroductionTitle>{title}</IntroductionTitle>
      <Introduction>{body}</Introduction>

      <VerticalStyle width={400} key="recommendedIntroduction">
        {splitByStep(TAG_NUMBER_BY_LINE, tags).map((specTags, i) => (
          <HorizontalStyle height={3} key={i}>
            {specTags.map((specTag, i) => (
              <SpecTag key={i}>{specTag}</SpecTag>
            ))}
          </HorizontalStyle>
        ))}
      </VerticalStyle>
    </Frame>
  );
};

export default RecommendedIntroduction;

import { TextAreaStyle } from "@/constants/styles/textArea";
import { setIntroductionTitle } from "@/modules/introductionRecommend/actions";
import { useDispatch } from "react-redux";

interface Props {
  height: number;
  placeholder: string;
  defaultText?: string;
}

const TitleTextArea = ({ height, placeholder, defaultText }: Props) => {
  const dispatch = useDispatch();

  return (
    <TextAreaStyle
      height={height}
      placeholder={placeholder}
      onChange={(event: any) => {
        dispatch(setIntroductionTitle(event.target.value));
      }}
      value={defaultText}
    />
  );
};

export default TitleTextArea;

import { TextAreaStyle } from "@/constants/styles/textArea";
import { setEditorContent } from "@/modules/spellCheck/actions";
import { useDispatch } from "react-redux";

interface Props {
  height: number;
  placeholder: string;
  defaultText?: string;
  onChange?: (number: number) => void;
}

const TextContentArea = ({ height, placeholder, onChange, defaultText }: Props) => {
  const dispatch = useDispatch();

  return (
    <TextAreaStyle
      height={height}
      placeholder={placeholder}
      onChange={(event: any) => {
        if (onChange === undefined) {
          return;
        }
        onChange!(event.target.value.length);
        dispatch(setEditorContent(event.target.value));
      }}
      value={defaultText}
    ></TextAreaStyle>
  );
};

export default TextContentArea;

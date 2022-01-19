import { setEditorContent } from "@/modules/editor/actions";
import { useDispatch } from "react-redux";
import * as S from "./styles";

interface Props {
  height: number;
  placeholder: string;
  defaultText?: string;
  onChange?: (number: number) => void;
}

const TextArea = ({ height, placeholder, onChange, defaultText }: Props) => {
  const dispatch = useDispatch();

  return (
    <S.Frame
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
    ></S.Frame>
  );
};

export default TextArea;

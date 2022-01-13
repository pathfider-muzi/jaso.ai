import TextArea from "@/components/_common/TextArea";
import VerticalStyle from "@/components/_common/VerticalStyle";

import { WordCountedText } from "./styles";

interface Props {
  number: number;
}

const EditForm = (props: Props) => {
  return (
    <VerticalStyle width={500}>
      <div>{props.number}</div>
      <TextArea height={50} placeholder="제목을 입력하세요."></TextArea>
      <TextArea
        height={200}
        placeholder="자소서 문항 제목을 입력하세요."
      ></TextArea>
      <TextArea
        height={500}
        placeholder="자소서 내용을 입력하세요. "
      ></TextArea>
      <WordCountedText>0 / 1000</WordCountedText>
      <button>저장</button>
    </VerticalStyle>
  );
};

export default EditForm;

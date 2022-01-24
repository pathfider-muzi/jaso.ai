import { ChangeEventHandler, useRef, useState } from "react";

export const resizeTextArea = (textAreaElement: HTMLTextAreaElement) => {
  textAreaElement.style.height = "inherit";
  textAreaElement.style.height = `${textAreaElement.scrollHeight}px`;
};

const useTextArea = (defaultValue: string) => {
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
  const [input, setInput] = useState(defaultValue);

  const onChangeInput: ChangeEventHandler<HTMLTextAreaElement> = event => {
    resizeTextArea(event.target);
    const newText = event.target.value;

    setInput(newText);
  };

  return {
    input,
    setInput,
    onChangeInput,
    textAreaRef
  };
};

export default useTextArea;

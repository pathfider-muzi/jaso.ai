import { ChangeEventHandler, useState } from "react";

const useInput = (defaultValue: string) => {
  const [input, setInput] = useState(defaultValue);

  const onChangeInput: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = event => {
    const newText = event.target.value;

    setInput(newText);
  };

  return {
    input,
    setInput,
    onChangeInput
  };
};

export default useInput;

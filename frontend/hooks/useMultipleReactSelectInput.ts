import { useState } from "react";
import { MultiValue } from "react-select";

const useMultipleReactSelectInput = (defaultValue: string[]) => {
  const [input, setInput] = useState(defaultValue);

  const onChangeInput = (
    options: MultiValue<{
      label: string;
      value: string;
    }>
  ) => {
    setInput(options?.map(option => option.value) || [""]);
  };

  return {
    input,
    setInput,
    onChangeInput
  };
};

export default useMultipleReactSelectInput;

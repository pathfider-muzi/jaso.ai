import { useState } from "react";
import { SingleValue } from "react-select";

const useReactSelectInput = (defaultValue: string) => {
  const [input, setInput] = useState(defaultValue);

  const onChangeInput = (selectedValue: SingleValue<string>) => {
    const newValue = selectedValue as unknown as {
      label: string;
      value: string;
    };

    setInput(newValue.value);
  };

  return {
    input,
    setInput,
    onChangeInput
  };
};

export default useReactSelectInput;

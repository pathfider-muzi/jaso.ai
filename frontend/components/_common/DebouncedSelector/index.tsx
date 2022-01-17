import PALETTE from "@/constants/palette";
import { useState } from "react";
import AsyncSelect from "react-select/async";
import * as S from "./styles";

interface Props {
  title: string;
  defaultValue: string;
  placeholder?: string;
  isClearable?: boolean;
  isDisabled?: boolean;
  isMulti?: boolean;
  delayMs: number;
  callback: (inputValue: string) => void;
  onChange: () => void;
}

const DebouncedSelector = ({
  defaultValue,
  title,
  isClearable = false,
  isDisabled = false,
  isMulti = false,
  placeholder,
  delayMs,

  onChange,
  callback,

  ...props
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [timeId, setTimeId] = useState<NodeJS.Timeout | null>(null);

  const getAsyncOptions = (inputValue: string) =>
    new Promise(resolve => {
      if (timeId) {
        clearTimeout(timeId);
      }

      const newTimeId = setTimeout(() => {
        setIsLoading(true);
        resolve(callback(inputValue));
        setIsLoading(false);
      }, delayMs);

      setTimeId(newTimeId);
    });

  return (
    <S.Frame {...props}>
      <S.Label>{title}</S.Label>
      <AsyncSelect
        loadOptions={getAsyncOptions}
        onChange={onChange}
        defaultOptions
        cacheOptions={true}
        isLoading={isLoading}
        styles={{
          control: base => ({
            ...base,
            borderColor: PALETTE.GRAY_150,
            boxShadow: "none",
            "&:hover": {
              borderColor: PALETTE.BLUE
            }
          })
        }}
      />
    </S.Frame>
  );
};

export default DebouncedSelector;

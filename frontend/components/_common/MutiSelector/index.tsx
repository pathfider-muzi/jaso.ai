import { useMemo } from "react";
import { MultiValue } from "react-select";
import DebouncedMultiSelector from "../DebouncedMultiSelector";
import * as S from "./styles";

const MAX_COLLEGE_ITEM_COUNT = 100;

interface Props {
  defaultValue: string[];
  label: string;
  isRequired: boolean;
  onChange: (
    newValue: MultiValue<{
      label: string;
      value: string;
    }>
  ) => void;
  data: string[];
}

const MultiSelector = ({ label, defaultValue, isRequired, onChange, data, ...props }: Props) => {
  const options = useMemo(() => {
    return data.map(_data => {
      return {
        label: _data,
        value: _data
      };
    });
  }, []);

  const filterValues = (inputValue: string) => {
    return options
      .filter(option => option.label.toLowerCase().includes(inputValue.toLowerCase()))
      .slice(0, MAX_COLLEGE_ITEM_COUNT)
      .sort((prev, next) => prev.label.length - next.label.length);
  };

  return (
    <S.Frame {...props}>
      <DebouncedMultiSelector
        title={label}
        isClearable={true}
        isMulti={true}
        isRequired={isRequired}
        defaultValue={defaultValue}
        onChange={onChange}
        delayMs={1000}
        callback={filterValues}
      />
    </S.Frame>
  );
};

export default MultiSelector;

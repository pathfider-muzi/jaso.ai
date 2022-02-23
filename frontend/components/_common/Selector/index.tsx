import { useMemo } from "react";
import { SingleValue } from "react-select";
import DebouncedSelector from "../DebouncedSelector";
import * as S from "./styles";

const MAX_COLLEGE_ITEM_COUNT = 1000;

interface Props {
  defaultValue: string;
  label: string;
  isRequired: boolean;
  onChange: (
    newValue: SingleValue<{
      label: string;
      value: string;
    }>
  ) => void;
  data: string[];
}

const Selector = ({ label, defaultValue, isRequired, onChange, data, ...props }: Props) => {
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
      <DebouncedSelector
        title={label}
        isClearable={true}
        isRequired={isRequired}
        defaultValue={defaultValue}
        onChange={onChange}
        delayMs={1000}
        callback={filterValues}
      />
    </S.Frame>
  );
};

export default Selector;

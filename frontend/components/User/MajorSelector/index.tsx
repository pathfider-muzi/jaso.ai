import DebouncedSelector from "@/components/_common/DebouncedSelector";
import MAJOR_LIST from "@/constants/majorList";
import { useMemo } from "react";
import { SingleValue } from "react-select";

const MAX_MAJOR_ITEM_COUNT = 100;
interface Props {
  defaultValue: string;
  isRequired: boolean;
  onChange: (
    newValue: SingleValue<{
      label: string;
      value: string;
    }>
  ) => void;
}

const MajorSelector = ({ defaultValue, onChange, isRequired }: Props) => {
  const options = useMemo(() => {
    return MAJOR_LIST.map(name => {
      return {
        label: name,
        value: name
      };
    });
  }, []);

  const filterCollege = (inputValue: string) => {
    return options
      .filter(option => option.label.toLowerCase().includes(inputValue.toLowerCase()))
      .slice(0, MAX_MAJOR_ITEM_COUNT);
  };

  return (
    <DebouncedSelector
      title="전공"
      isClearable={true}
      isRequired={isRequired}
      defaultValue={defaultValue}
      onChange={onChange}
      delayMs={1000}
      callback={filterCollege}
    />
  );
};

export default MajorSelector;

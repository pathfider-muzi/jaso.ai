import COLLEGE_LIST from "@/components/User/CollegeSelector/constants/collegeList";
import DebouncedSelector from "@/components/_common/DebouncedSelector";
import { useMemo } from "react";
import { SingleValue } from "react-select";

const MAX_COLLEGE_ITEM_COUNT = 100;
interface Props {
  defaultValue: string;
  onChange: (
    newValue: SingleValue<{
      label: string;
      value: string;
    }>
  ) => void;
}

const CollegeSelector = ({ defaultValue, onChange }: Props) => {
  const options = useMemo(() => {
    return COLLEGE_LIST.map(name => {
      return {
        label: name,
        value: name
      };
    });
  }, []);

  const filterCollege = (inputValue: string) => {
    return options
      .filter(option => option.label.toLowerCase().includes(inputValue.toLowerCase()))
      .slice(0, MAX_COLLEGE_ITEM_COUNT);
  };

  return (
    <DebouncedSelector
      title="대학교"
      isClearable={true}
      isRequired={true}
      defaultValue={defaultValue}
      onChange={onChange}
      delayMs={1000}
      callback={filterCollege}
    />
  );
};

export default CollegeSelector;

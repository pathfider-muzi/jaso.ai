import PALETTE from "@/constants/styles/palette";
import SelectComponent from "react-select";
import * as S from "./styles";

interface Props {
  title: string;
  defaultValue: string;
  options: {
    label: string;
    value: string;
  }[];
  placeholder?: string;

  isClearable?: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
  isMulti?: boolean;

  onChange: () => void;
}

const Selector = ({
  defaultValue,
  title,
  options,
  isClearable = false,
  isLoading = false,
  isDisabled = false,
  isMulti = false,
  placeholder,

  onChange,
  ...props
}: Props) => {
  const onChangeSelector = (newValue: unknown) => {
    if (typeof newValue !== "string") return;

    onChange();
  };

  return (
    <S.Frame {...props}>
      <S.Label>{title}</S.Label>
      <SelectComponent
        options={options}
        onChange={onChangeSelector}
        placeholder={placeholder}
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

export default Selector;

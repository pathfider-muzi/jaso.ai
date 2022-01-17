import * as S from "./styles";

export type Option = {
  label: string;
  onClick: () => void;
};

interface Props {
  options: Option[];
}

const DropDownOption = ({ options, ...props }: Props) => {
  return (
    <S.Frame {...props}>
      {options.map(({ label, onClick }) => {
        return (
          <S.Text key={label} type="button" onClick={onClick}>
            {label}
          </S.Text>
        );
      })}
    </S.Frame>
  );
};

export default DropDownOption;

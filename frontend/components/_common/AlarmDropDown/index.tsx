import useModal from "@/hooks/useModal";
import AlarmButton from "../AlarmButton";
import * as S from "./styles";

interface Props {
  unReadAlarmCount: number;
  data: {
    input: string;
    output: string;
    viewed: boolean;
  }[];
}

const AlarmDropDown = ({ data, unReadAlarmCount, ...props }: Props) => {
  const { isModalOpen: isAlarmDropDownModalOpen, toggleModal: toggleAlarmDropDown } = useModal({ defaultValue: false });

  return (
    <S.Frame {...props}>
      <AlarmButton unReadAlarmCount={unReadAlarmCount} onClick={toggleAlarmDropDown} />
      {isAlarmDropDownModalOpen && (
        <S.ContentModal>
          {data.map(_data => {
            return (
              <S.Alarm key={_data.input} isViewed={_data.viewed}>
                <S.AlarmTitle>{_data.input}</S.AlarmTitle>
                <S.AlarmContent>{_data.output}</S.AlarmContent>
              </S.Alarm>
            );
          })}
        </S.ContentModal>
      )}
    </S.Frame>
  );
};

export default AlarmDropDown;

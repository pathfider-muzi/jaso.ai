import * as S from "./styles";

interface Props {
  data: {
    value: string;
    label: string;
  }[];
}

const StatisticsIntroduction = ({ data, ...props }: Props) => {
  return (
    <S.Frame {...props}>
      <S.StatisticsWrapper>
        {data.map(({ label, value }) => {
          return (
            <S.Statistics key={label}>
              <S.StatisticsValue>{value}</S.StatisticsValue>
              <S.StatisticsLabel>{label}</S.StatisticsLabel>
            </S.Statistics>
          );
        })}
      </S.StatisticsWrapper>
    </S.Frame>
  );
};

export default StatisticsIntroduction;

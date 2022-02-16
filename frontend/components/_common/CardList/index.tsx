import { Props as ToolTipProps } from "../ToolTip";
import * as S from "./styles";

interface Props {
  onClickPlusCard: () => void;
  onClickDeleteButton: (id: number) => void;
  onClickCard: (id: number) => void;
  data: {
    id: number;
    cardText: string;
  }[];
  addButtonToolTipInfo: Pick<ToolTipProps, "text" | "textBubbleStyle">;
}

const CardList = ({
  onClickPlusCard,
  onClickDeleteButton,
  onClickCard,
  data,
  addButtonToolTipInfo,
  ...props
}: Props) => {
  return (
    <S.Frame {...props}>
      <S.ToolTip {...addButtonToolTipInfo}>
        <S.PlusCard text="+" onClick={onClickPlusCard} />
      </S.ToolTip>

      {data.map(({ id, cardText }) => {
        return (
          <S.CardWrapper key={id}>
            <S.Card text={cardText} onClick={() => onClickCard(id)} />
            <S.DeleteButton type="button" onClick={() => onClickDeleteButton(id)}>
              {"×"}
            </S.DeleteButton>
          </S.CardWrapper>
        );
      })}
    </S.Frame>
  );
};

export default CardList;

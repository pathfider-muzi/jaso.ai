import * as S from "./styles";

interface Props {
  curIndex: number;
  qnaId: number;
  selectedPageNumber: number;
  onClickPageMarkButton: (index: number) => void;
}

const PageMark = ({ qnaId, curIndex, selectedPageNumber, onClickPageMarkButton }: Props) => {
  return (
    <S.PageMarkButtonWrapper key={qnaId + curIndex} active={curIndex + 1 === selectedPageNumber}>
      <S.PageMarkButton type="button" onClick={() => onClickPageMarkButton(curIndex + 1)}>
        {curIndex + 1}
      </S.PageMarkButton>
    </S.PageMarkButtonWrapper>
  );
};

export default PageMark;

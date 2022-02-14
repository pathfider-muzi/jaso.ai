import deleteSelfIntroduction from "@/api/deleteSelfIntroduction";
import BRAND_NAME from "@/constants/brandName";
import ROUTE from "@/constants/routes";
import useSelfIntroductions from "@/hooks/useSelfIntroductions";
import { SelfIntroduction } from "@/types/SelfIntroduction";
import Link from "next/link";
import { useMutation } from "react-query";
import * as S from "./styles";

interface Props {}

const MySelfIntroductions = ({ ...props }: Props) => {
  const { selfIntroductions, createSelfIntroduction, refetchSelfIntroductions } = useSelfIntroductions({});
  const deleteSelfIntroductionMutation = useMutation(deleteSelfIntroduction);

  const onClickPlusCard = () => {
    createSelfIntroduction({
      title: "(제목없음)",
      organisationName: "",
      role: ""
    });
  };

  const onClickDeleteButton = (selfIntroductionId: SelfIntroduction["id"]) => {
    if (!confirm("정말로 삭제하시겠습니까?")) return;

    deleteSelfIntroductionMutation.mutate(selfIntroductionId, {
      onSuccess: () => {
        refetchSelfIntroductions();
      }
    });
  };

  return (
    <S.Screen title="내 자기소개서" description={`내가 작성한 자기소개서 목록, ${BRAND_NAME}`}>
      <S.Frame {...props}>
        <S.Header>
          <S.Title>내 자기소개서 목록</S.Title>
        </S.Header>
        <S.CardsWrapper>
          <S.PlusCard text="+" onClick={onClickPlusCard} />

          {selfIntroductions
            ?.sort((prev, next) => new Date(next.updatedDate).getTime() - new Date(prev.updatedDate).getTime())
            .map(selfIntroduction => {
              return (
                <S.CardWrapper key={selfIntroduction.id}>
                  <Link href={`${ROUTE.MY_SELFINTRODUCTIONS}/${selfIntroduction.id}`} passHref={true}>
                    <a>
                      <S.Card text={selfIntroduction.title} />
                    </a>
                  </Link>
                  <S.DeleteButton type="button" onClick={() => onClickDeleteButton(selfIntroduction.id)}>
                    {"×"}
                  </S.DeleteButton>
                </S.CardWrapper>
              );
            })}
        </S.CardsWrapper>
      </S.Frame>
    </S.Screen>
  );
};

export default MySelfIntroductions;

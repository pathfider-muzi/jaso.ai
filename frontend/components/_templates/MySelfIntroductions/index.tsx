import CardList from "@/components/_common/CardList";
import BRAND_NAME from "@/constants/brandName";
import ROUTE from "@/constants/routes";
import useSelfIntroductions from "@/hooks/useSelfIntroductions";
import { SelfIntroduction } from "@/types/SelfIntroduction";
import { useRouter } from "next/router";
import * as S from "./styles";

const MySelfIntroductions = ({ ...props }) => {
  const router = useRouter();

  const { selfIntroductions, createSelfIntroduction, deleteSelfIntroduction } = useSelfIntroductions({});

  const onClickCard = (id: SelfIntroduction["id"]) => {
    router.push(`${ROUTE.MY_SELFINTRODUCTIONS}/${id}`);
  };
  const onMouseOverCard = (id: SelfIntroduction["id"]) => {
    router.prefetch(`${ROUTE.MY_SELFINTRODUCTIONS}/${id}`);
  };

  const onClickPlusCard = () => {
    createSelfIntroduction({
      title: "제목없는 자기소개서",
      organisationName: "",
      role: ""
    });
  };

  const onClickDeleteButton = (selfIntroductionId: SelfIntroduction["id"]) => {
    if (!confirm("정말로 삭제하시겠습니까?")) return;

    deleteSelfIntroduction(selfIntroductionId);
  };

  const data = selfIntroductions.map(({ id, title }) => {
    return {
      id,
      cardText: title
    };
  });

  return (
    <S.Screen title="내 자기소개서" description={`내가 작성한 자기소개서 목록, ${BRAND_NAME}`}>
      <S.Frame {...props}>
        <S.Header>
          <S.Title>내 자기소개서 목록</S.Title>
        </S.Header>
        <CardList
          onClickPlusCard={onClickPlusCard}
          onClickCard={onClickCard}
          onClickDeleteButton={onClickDeleteButton}
          onMouseOverCard={onMouseOverCard}
          data={data}
          addButtonToolTipInfo={{
            text: "자기소개서를 추가하세요",
            textBubbleStyle: {
              right: "0.5rem",
              bottom: "-4rem"
            }
          }}
        />
      </S.Frame>
    </S.Screen>
  );
};

export default MySelfIntroductions;

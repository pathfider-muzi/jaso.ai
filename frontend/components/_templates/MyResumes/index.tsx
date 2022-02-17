import CardList from "@/components/_common/CardList";
import BRAND_NAME from "@/constants/brandName";
import ROUTE from "@/constants/routes";
import useResumes from "@/hooks/useResumes";
import useUser from "@/hooks/useUser";
import { Resume } from "@/types/Resume";
import { useRouter } from "next/router";
import * as S from "./styles";

const MyResumes = ({ ...props }) => {
  const router = useRouter();
  const { resumes, createResume, deleteResume } = useResumes({ enabled: true });

  const { user } = useUser({ enabled: false });

  const onClickPlusCard = () => {
    createResume({
      title: "제목없는 이력서",
      name: "",
      role: "",
      email: user?.userInfos[0].email || "",
      contacts: []
    });
  };

  const onClickDeleteButton = (id: Resume["id"]) => {
    if (!confirm("정말로 삭제하시겠습니까?")) return;

    deleteResume(id);
  };

  const onClickCard = (id: Resume["id"]) => {
    router.push(`${ROUTE.MY_RESUMES}/${id}`);
  };

  const onMouseOverCard = (id: Resume["id"]) => {
    router.prefetch(`${ROUTE.MY_RESUMES}/${id}`);
  };

  const data = resumes.map(({ id, title }) => {
    return {
      id,
      cardText: title
    };
  });

  return (
    <S.Screen title="내 이력서 목록" description={`내가 작성한 이력서 목록, ${BRAND_NAME}`}>
      <S.Frame {...props}>
        <S.Header>
          <S.Title>내 이력서 목록</S.Title>
        </S.Header>
        <CardList
          onClickPlusCard={onClickPlusCard}
          onClickCard={onClickCard}
          onClickDeleteButton={onClickDeleteButton}
          data={data}
          onMouseOverCard={onMouseOverCard}
          addButtonToolTipInfo={{
            text: "이력서를 추가하세요",
            textBubbleStyle: {
              right: "1.5rem",
              bottom: "-4rem"
            }
          }}
        />
      </S.Frame>
    </S.Screen>
  );
};

export default MyResumes;

import BRAND_NAME from "@/constants/brandName";
import SERVICE_NOTICE from "./constant/serviceNotice";
import * as S from "./styles";

const ServiceNotice = () => {
  return (
    <S.Screen title="공지사항" description={`AI 자소서 assistant, ${BRAND_NAME} 홈페이지`}>
      <S.PageTitle>공지사항</S.PageTitle>
      <S.Frame>
        {SERVICE_NOTICE.map(({ title, content, date }) => {
          return (
            <S.Notice key={title + date}>
              <S.Header>
                <S.Title>{title}</S.Title>
                <S.Date>{date}</S.Date>
              </S.Header>
              <S.Content>{content}</S.Content>
            </S.Notice>
          );
        })}
      </S.Frame>
    </S.Screen>
  );
};

export default ServiceNotice;

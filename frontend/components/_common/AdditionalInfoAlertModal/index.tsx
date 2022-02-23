import ROUTE from "@/constants/routes";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import * as S from "./styles";

const OPEN_TIME_SEC = 5;

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AdditionalInfoAlertModal = ({ isOpen, onClose }: Props) => {
  const router = useRouter();

  const [remainSec, setRemainSec] = useState(0);
  const timeIdRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isOpen) {
      setRemainSec(OPEN_TIME_SEC);
      timeIdRef.current = setInterval(() => {
        setRemainSec(sec => sec - 1);
      }, 1000);
    } else {
      if (timeIdRef.current) clearInterval(timeIdRef.current);
    }
  }, [isOpen]);

  useEffect(() => {
    if (remainSec === 0) {
      onClose();
    }
  }, [remainSec]);

  useEffect(() => {
    return () => {
      if (timeIdRef.current) clearInterval(timeIdRef.current);
    };
  }, []);

  return (
    <S.Frame isOpen={isOpen} onClose={onClose} title="추가정보 미입력">
      <S.Content>
        <S.Text>추가정보를 입력하시면 더 나은 자기소개서를 추천받을 수 있습니다.</S.Text>
        <p>{`${remainSec}초 후에 창이 닫힙니다.`}</p>
        <S.LinkButton
          onClick={() => {
            router.push(ROUTE.USER_PROFILE);
          }}
        >
          추가정보 입력하러 가기
        </S.LinkButton>
      </S.Content>
    </S.Frame>
  );
};

export default AdditionalInfoAlertModal;

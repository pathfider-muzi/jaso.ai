import Button from "@/components/common/Button";
import EditableAdditionalInformationText from "../EditableAdditionalInformationText";
import * as S from "./styles";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AdditionalInformationModal = ({ isOpen, onClose }: Props) => {
  return (
    <S.Frame isOpen={isOpen} onClose={onClose} title="추가정보">
      <S.InfoList>
        <EditableAdditionalInformationText
          label="직군"
          value="개발"
          isRequired={true}
        />
        <EditableAdditionalInformationText
          label="직무"
          value="프론트엔드"
          isRequired={true}
        />
        <EditableAdditionalInformationText
          label="경력"
          value="신입"
          isRequired={true}
        />
        <EditableAdditionalInformationText
          label="현재 연봉"
          value="x,000만원"
          isRequired={false}
        />
      </S.InfoList>
      <S.Footer>
        <Button type="button" size="md" onClick={onClose}>
          취소
        </Button>
        <S.SaveButton
          type="button"
          size="md"
          onClick={() => {
            alert("저장버튼 클릭");
          }}
        >
          저장
        </S.SaveButton>
      </S.Footer>
    </S.Frame>
  );
};

export default AdditionalInformationModal;

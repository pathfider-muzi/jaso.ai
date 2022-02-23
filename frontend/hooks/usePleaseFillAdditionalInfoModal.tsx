import getIsFilledAdditionalInfo from "@/api/getIsFilledAddtionalInfo";
import { useQuery } from "react-query";
import useModal from "./useModal";
import useUser from "./useUser";

const usePleaseFillAdditionalModal = () => {
  const { user } = useUser({ enabled: false });
  const { isModalOpen, closeModal, openModal } = useModal({ defaultValue: false });

  useQuery(["isFilledAdditionalInfo"], getIsFilledAdditionalInfo, {
    enabled: !!user,
    refetchOnWindowFocus: false,
    onSettled: isFilledAdditionalInfo => {
      if (!isFilledAdditionalInfo) {
        openModal();
      }
    }
  });

  return {
    isPleaseFillAdditionalModalOpen: isModalOpen,
    closePleaseFillAdditionalModal: closeModal
  };
};

export default usePleaseFillAdditionalModal;

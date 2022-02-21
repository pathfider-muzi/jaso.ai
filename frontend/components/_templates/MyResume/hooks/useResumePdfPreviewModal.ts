import ROUTE from "@/constants/routes";
import useModal from "@/hooks/useModal";
import { Resume } from "@/types/Resume";
import { useRouter } from "next/router";

interface Props {
  resumeId: Resume["id"];
}

const useResumePdfPreviewModal = ({ resumeId }: Props) => {
  const router = useRouter();
  const { isPreviewOpen: isPreviewOpenAsString } = router.query as { isPreviewOpen: "true" | "false" };
  const isPreviewOpen = isPreviewOpenAsString === "true" ? true : false;

  const { isModalOpen: isResumePdfPreviewOpen, toggleModal: _toggleResumePdfPreview } = useModal({
    defaultValue: isPreviewOpen
  });

  const toggleResumePdfPreview = () => {
    router.replace({
      pathname: `/${ROUTE.MY_RESUMES}/${resumeId}`,
      query: {
        isPreviewOpen: !isResumePdfPreviewOpen
      }
    });

    _toggleResumePdfPreview();
  };

  return {
    isResumePdfPreviewOpen,
    toggleResumePdfPreview
  };
};

export default useResumePdfPreviewModal;

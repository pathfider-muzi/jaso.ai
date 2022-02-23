import useModal from "@/hooks/useModal";
import { useRouter } from "next/router";

const useResumePdfPreviewModal = () => {
  const router = useRouter();
  const { isPreviewOpen: isPreviewOpenAsString } = router.query as { isPreviewOpen: "true" | "false" };
  const isPreviewOpen = isPreviewOpenAsString === "true" ? true : false;

  const { isModalOpen: isResumePdfPreviewOpen, toggleModal: _toggleResumePdfPreview } = useModal({
    defaultValue: isPreviewOpen
  });

  const toggleResumePdfPreview = () => {
    router.replace({
      pathname: router.pathname,
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

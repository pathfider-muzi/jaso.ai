import { useState } from "react";

interface Props {
  defaultValue?: boolean;
}

const useModal = ({ defaultValue = false }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(defaultValue);

  const closeModal = () => setIsModalOpen(false);
  const openModal = () => setIsModalOpen(true);
  const toggleModal = () => setIsModalOpen((state) => !state);

  return {
    isModalOpen,
    setIsModalOpen,
    closeModal,
    openModal,
    toggleModal,
  };
};

export default useModal;

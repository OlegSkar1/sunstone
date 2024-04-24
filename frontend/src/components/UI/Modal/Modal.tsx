'use client';
import { useModalStore } from '@/store/modalStore';
import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/react';

const ModalPage = () => {
  const isVisible = useModalStore((state) => state.isVisible);
  const content = useModalStore((state) => state.content);
  const title = useModalStore((state) => state.title);
  const hideModal = useModalStore((state) => state.hideModal);
  return (
    <Modal isOpen={isVisible} onOpenChange={hideModal} backdrop="blur">
      <ModalContent>
        <ModalHeader className="flex justify-center">{title}</ModalHeader>
        <ModalBody>{content}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalPage;

import { PropsWithChildren } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalProps,
} from "@nextui-org/react";

interface CustomModalProps {
  title?: string;
  size?: ModalProps["size"];
  isOpen?: boolean;
  onClose?: () => void;
}

export function CustomModal({
  title,
  isOpen,
  onClose,
  children,
  size
}: PropsWithChildren<CustomModalProps>) {
  return (
    <Modal size={size} isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <>
          <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
          <ModalBody>{children}</ModalBody>
        </>
        <ModalFooter></ModalFooter>
      </ModalContent>
    </Modal>
  );
}

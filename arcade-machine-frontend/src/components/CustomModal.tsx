import {PropsWithChildren} from "react";
import {Modal, ModalBody, ModalContent, ModalHeader} from "@nextui-org/react";

interface CustomModalProps {
    title?: string;
    size?: string;
    isOpen?: boolean;
    onClose?: () => void;
}

export function CustomModal({title, size, isOpen, onClose, children}: PropsWithChildren<CustomModalProps>) {


    return (
        <>


            <Modal

                size={size}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalContent>
                    {() => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
                            <ModalBody>
                                {children}
                            </ModalBody>

                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}

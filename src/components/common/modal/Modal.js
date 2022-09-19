import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/react";

function CommonModal(props) {
    const { isOpen, onClose, title, body, btnLabel, btnAction } = props;
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    { title }
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {
                        body
                    }
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose}>
                        Close
                    </Button>
                    <Button onClick={btnAction}>
                        { btnLabel }
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default CommonModal
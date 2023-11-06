import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogFooter, DialogHeader} from "../ui/dialog";
import { Button } from "../ui/button";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";

export function NewBoardDialog({isOpen, onOpen, onOpenChange}) {
    return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="md" placement="center" backdrop="blur" >
        <ModalContent>
            {(_onClose) => (
                <>
                    <ModalHeader>
                        Stwórz projekt
                    </ModalHeader>
                    <ModalBody>
                        <p> Wprowadz nazwe projektu</p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success">Stwórz</Button>
                        <Button variant={"destructive"}>Anuluj</Button>
                    </ModalFooter>
                    
                </>
            )}
            </ModalContent>
        
    </Modal>
    )
}
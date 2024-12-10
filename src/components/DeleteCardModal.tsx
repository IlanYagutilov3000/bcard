import { FunctionComponent } from "react";
import { Button, Modal } from "react-bootstrap";
import { deleteCard } from "../services/cardService";
import { errorMsg, successMsg } from "../services/feedback";

interface DeleteCardModalProps {
    show: boolean;
    onHide: Function;
    refresh: Function;
    cardId: string;
    bizzNumber: number;
}

const DeleteCardModal: FunctionComponent<DeleteCardModalProps> = ({show, onHide, refresh, cardId, bizzNumber}) => {
    return (
        <>
            <Modal
                show={show}
                onHide={() => onHide()}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Delete Card
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="conatiner d-flex flex-column align-items-center">
                        <p>Are You Sure You Want To Delete This Card?</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div>
                        <Button variant="success" onClick={() => onHide()}>No</Button>

                        <Button variant="danger mx-1" onClick={() => deleteCard(cardId as string, bizzNumber as number).then(() => {
                            onHide()
                            refresh()
                            successMsg("User Was Deleted!")
                        }).catch((err) => {
                            errorMsg("Opss.. Something Went Wrong!")
                            console.log(err)
                        }
                        )}>Delete</Button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DeleteCardModal;
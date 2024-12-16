import { FunctionComponent, useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { deleteCard } from "../services/cardService";
import { errorMsg, successMsg } from "../services/feedback";
import { SiteTheme } from "../App";

interface DeleteCardModalProps {
    show: boolean;
    onHide: Function;
    refresh: Function;
    cardId: string;
    bizzNumber: number;
}

const DeleteCardModal: FunctionComponent<DeleteCardModalProps> = ({show, onHide, refresh, cardId, bizzNumber}) => {
    const { color, background } = useContext(SiteTheme);
    return (
        <>
            <Modal
                show={show}
                onHide={() => onHide()}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton style={{ backgroundColor: background, color: color }}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Delete Card
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: background, color: color }}>
                    <div className="conatiner d-flex flex-column align-items-center">
                        <p>Are You Sure You Want To Delete This Card?</p>
                    </div>
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: background, color: color }}>
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
import { FunctionComponent } from "react";
import { Modal } from "react-bootstrap";
import EditCard from "./EditCard";

interface UpdateCardModalProps {
    show: boolean;
    onHide: Function;
    refresh: Function;
    cardId: string;
}

const UpdateCardModal: FunctionComponent<UpdateCardModalProps> = ({show, onHide, refresh, cardId}) => {
    return (
        <>
            <Modal
                show={show}
                onHide={() => onHide()}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Update Card
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditCard onHide={onHide} refresh={refresh} cardId={cardId} />
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal >
        </>
    );
}

export default UpdateCardModal;
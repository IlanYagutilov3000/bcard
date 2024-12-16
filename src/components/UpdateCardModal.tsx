import { FunctionComponent, useContext } from "react";
import { Modal } from "react-bootstrap";
import EditCard from "./EditCard";
import { SiteTheme } from "../App";

interface UpdateCardModalProps {
    show: boolean;
    onHide: Function;
    refresh: Function;
    cardId: string;
}

const UpdateCardModal: FunctionComponent<UpdateCardModalProps> = ({show, onHide, refresh, cardId}) => {
    const { color, background } = useContext(SiteTheme);
    return (
        <>
            <Modal
                show={show}
                onHide={() => onHide()}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton style={{ backgroundColor: background, color: color }}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Update Card
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: background, color: color }}>
                    <EditCard onHide={onHide} refresh={refresh} cardId={cardId} />
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: background, color: color }}>
                </Modal.Footer>
            </Modal >
        </>
    );
}

export default UpdateCardModal;
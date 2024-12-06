import { FunctionComponent } from "react";
import { Modal } from "react-bootstrap";
import UpdateUser from "./UpdateUser";

interface UpdateUserModalProps {
    show: boolean;
    onHide: Function;
    refresh: Function;
    userId: string;
}

const UpdateUserModal: FunctionComponent<UpdateUserModalProps> = ({ show, onHide, refresh, userId }) => {
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
                        Update User
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <UpdateUser onHide={onHide} refresh={refresh} userId={userId} />
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UpdateUserModal;
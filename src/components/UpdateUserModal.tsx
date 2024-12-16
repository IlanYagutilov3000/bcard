import { FunctionComponent, useContext } from "react";
import { Modal } from "react-bootstrap";
import UpdateUser from "./UpdateUser";
import { SiteTheme } from "../App";

interface UpdateUserModalProps {
    show: boolean;
    onHide: Function;
    refresh: Function;
    userId: string;
}

const UpdateUserModal: FunctionComponent<UpdateUserModalProps> = ({ show, onHide, refresh, userId }) => {
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
                        Update User
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ backgroundColor: background, color: color }}>
                    <UpdateUser onHide={onHide} refresh={refresh} userId={userId} />
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: background, color: color }}>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default UpdateUserModal;
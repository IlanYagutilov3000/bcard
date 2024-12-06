import { FunctionComponent } from "react";
import { Button, Modal } from "react-bootstrap";
import { deleteUser } from "../services/userService";
import { errorMsg, successMsg } from "../services/feedback";

interface DeleteUserModalProps {
    show: boolean;
    onHide: Function;
    refresh: Function;
    userId: string;
}

const DeleteUserModal: FunctionComponent<DeleteUserModalProps> = ({ show, onHide, refresh, userId }) => {
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
                        Delete User
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="conatiner d-flex flex-column align-items-center">
                        <p>Are You Sure You Want To Delete This User?</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <div>
                        <Button variant="success" onClick={() => onHide()}>No</Button>

                        <Button variant="danger mx-1" onClick={() => deleteUser(userId).then(() => {
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

export default DeleteUserModal;
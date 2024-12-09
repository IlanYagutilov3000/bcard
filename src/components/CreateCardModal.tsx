import { FormikValues, useFormik } from "formik";
import { FunctionComponent, useState } from "react";
import * as yup from "yup";
import Card from "../interfaces/Card";
import { createNewCard } from "../services/cardService";
import { errorMsg, successMsg } from "../services/feedback";
import { Modal } from "react-bootstrap";
import CreateCard from "./CreateCard";
/* need to add prop for the modal */
interface CreateCardModalProps {
    show: boolean;
    onHide: Function;
    refresh: Function;
}

const CreateCardModal: FunctionComponent<CreateCardModalProps> = ({onHide, refresh, show}) => {
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
                <CreateCard onHide={onHide} refresh={refresh} />
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal >
        </>
    );
}

export default CreateCardModal;
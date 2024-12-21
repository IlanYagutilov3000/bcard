import { FormikValues, useFormik } from "formik";
import { FunctionComponent, useContext, useState } from "react";
import * as yup from "yup";
import Card from "../interfaces/Card";
import { createNewCard } from "../services/cardService";
import { errorMsg, successMsg } from "../services/feedback";
import { Modal } from "react-bootstrap";
import CreateCard from "./CreateCard";
import { SiteTheme } from "../App";

interface CreateCardModalProps {
    show: boolean;
    onHide: Function;
    refresh: Function;
}

const CreateCardModal: FunctionComponent<CreateCardModalProps> = ({onHide, refresh, show}) => {
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
                <Modal.Title id="contained-modal-title-vcenter" >
                    Create Card
                </Modal.Title>
            </Modal.Header>
                <Modal.Body style={{ backgroundColor: background, color: color }}>
                <CreateCard onHide={onHide} refresh={refresh} />
            </Modal.Body>
                <Modal.Footer style={{ backgroundColor: background, color: color }}>
            </Modal.Footer>
        </Modal >
        </>
    );
}

export default CreateCardModal;
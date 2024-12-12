import { FunctionComponent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getCardById } from "../services/cardService";
import Card from "../interfaces/Card";
import "../styles/CardDetails.css";
import { useUserContext } from "../context/userContext";

interface CardDetailsProps {

}

const CardDetails: FunctionComponent<CardDetailsProps> = () => {
    const { id } = useParams()
    const [cardDetails, setCardDetails] = useState<Card | null>(null);
    const {isAdmin} = useUserContext()
    useEffect(() => {
        getCardById(id as string).then((res) => {
            setCardDetails(res.data)
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    return (
        <>
            <div className="container appMargin containerTwo">
                <div className="imageBox me-2">
                    <img src={cardDetails?.image?.url} alt={cardDetails?.image?.alt} />
                </div>
                <div className="textBox">
                    <h2 className="display-5">Business Details</h2>
                    <h4 className="display-6"><span className="fw-bold">Title</span>: {cardDetails?.title}</h4>
                    <p>{cardDetails?.subtitle}</p>
                    <p>{cardDetails?.description}</p>
                    <p><span className="fw-bold">Phone</span>: {cardDetails?.phone}</p>
                    <p><span className="fw-bold">email</span>: {cardDetails?.email}</p>
                    <p><span className="fw-bold">Bizz Number</span>: {cardDetails?.bizNumber} {isAdmin && (<button className="btn"><i className="fa-solid fa-pen text-success"></i></button>)} </p>
                    <p><a href={cardDetails?.web} target="_blank" rel="noopener noreferrer">Click To Go The Website </a></p>
                    <p><span className="fw-bold">Address</span>: {cardDetails?.address.street}, {cardDetails?.address.city}, {cardDetails?.address.state}, {cardDetails?.address.country}</p>
                </div>
            </div>

        </>
    );
}

export default CardDetails;
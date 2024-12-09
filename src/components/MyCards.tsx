import { FunctionComponent, useEffect, useState } from "react";
import { getMyCards } from "../services/cardService";
import Card from "../interfaces/Card";

interface MyCardsProps {

}

const MyCards: FunctionComponent<MyCardsProps> = () => {
    const [myCards, setMyCards] = useState<Card[]>([])
    useEffect(() => {
        getMyCards().then((res) => {
            setMyCards(myCards)
        }).catch((err) => {
            console.log(err);
        })
    }, [])
    
    return (
        <>
            <h3 className="display-4">My Cards</h3>
            <p>Here you can find all your cards</p>
            <div className="container">
                <div className="row mt-3 gap-2 d-flex justify-content-center">
                    {myCards.length ? (
                        myCards.map(card => (
                            <div
                                className="card col-md-4"
                                key={card._id}
                                style={{ width: "18rem" }}
                            >
                                <div className="card-header">
                                    <span className="card-title">{card.title}</span>
                                    <span>{card.subtitle}</span>
                                </div>
                                <img
                                    src={card.image.url}
                                    alt={card.image.alt}
                                    title={card.title}
                                />
                                <div className="card-body">
                                    <p className="card-text m-0"><span className="fw-bold">Phone:</span> {card.phone}</p>
                                    <p className="card-text m-0"><span className="fw-bold">Address: </span>{card.address.city}</p>
                                    <p className="card-text m-0"><span className="fw-bold">Description: </span>{card.description}</p>
                                    <p className="card-text text-success m-0"><span className="fw-bold">Card Number: </span>{card.bizNumber}</p>
                                </div>
                                <div className="d-flex p-0 justify-content-between">
                                    <div>
                                        {/* <button className="btn" onClick={() => {
                                            handleUnlikeCard(card._id as string)
                                        }} ><i className="fa-solid fa-heart"></i></button> */}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No Cards Yet</p>
                    )}
                </div>
            </div>

        </>
    );
}

export default MyCards;
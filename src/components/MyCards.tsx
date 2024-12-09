import { FunctionComponent, useEffect, useState } from "react";
import { deleteCard, getMyCards } from "../services/cardService";
import Card from "../interfaces/Card";
import CreateCardModal from "./CreateCardModal";
import { useUserContext } from "../context/userContext";
import useToken from "../customHooks/useToken";
import UpdateCardModal from "./UpdateCardModal";

interface MyCardsProps {

}

const MyCards: FunctionComponent<MyCardsProps> = () => {
    const [myCards, setMyCards] = useState<Card[]>([])
    const [cardChanged, setCardChanged] = useState<boolean>(false)
    const [openUpadCardteModal, setOpenUpadCardteModal] = useState<boolean>(false);
    const [openEditCard, setOpenEditCard] = useState<boolean>(false)
    const [cardId, setCardId] = useState<string>("")
    const { setAuth, auth, isAdmin, isLogedIn, setIsLogedIn, isBusiness, setIsBusiness, setIsAdmin } = useUserContext()
    const { afterDecode } = useToken();

    let refresh = () => {
        setCardChanged(!cardChanged)
    }

    useEffect(() => {
        getMyCards().then((res) => {
            setMyCards(res.data)
        }).catch((err) => {
            console.log(err);
        })
    }, [cardChanged])

    useEffect(() => {
        if (afterDecode) {
            setAuth(afterDecode);
            setIsLogedIn(true);
            setIsAdmin(afterDecode.isAdmin);
            setIsBusiness(afterDecode.isBusiness);
        } else {
            setIsLogedIn(false);
            setIsAdmin(false);
            setIsBusiness(false)
        }
    }, [useToken, setAuth, isLogedIn, isAdmin, isBusiness]);

    return (
        <>
            <h3 className="display-4">My Cards</h3>
            <p>Here you can find all your cards</p>
            <button onClick={() => {
                setOpenUpadCardteModal(true)
            }} >Add Card</button>
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
                                    <h5 className="card-title">{card.title}</h5>

                                </div>
                                <img
                                    src={card?.image?.url}
                                    alt={card?.image?.alt}
                                    title={card.title}
                                />
                                <div className="card-body">
                                    <span>{card.subtitle}</span>
                                    <p className="card-text m-0"><span className="fw-bold">Phone:</span> {card.phone}</p>
                                    <p className="card-text m-0"><span className="fw-bold">Address: </span>{card.address.city}</p>
                                    <p className="card-text m-0"><span className="fw-bold">Description: </span>{card.description}</p>
                                    <p className="card-text text-success m-0"><span className="fw-bold">Card Number: </span>{card.bizNumber}</p>
                                </div>
                                <div className="d-flex p-0 justify-content-between">
                                    <div>
                                        <button className="btn" onClick={() => {
                                            // make this into a modal
                                            if (window.confirm("are you sure")) {
                                                deleteCard(card._id as string, card.bizNumber as number).then(() => {
                                                    setCardChanged(!cardChanged)
                                                }).catch((err) => {
                                                    console.log(err);
                                                })
                                            }
                                        }} ><i className="fa-solid fa-trash"></i></button>

                                        <button className="btn" onClick={() => {
                                            setOpenEditCard(true)
                                            setCardId(card._id as string)
                                        }} ><i className="fa-solid fa-pen"></i></button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No Cards Yet</p>
                    )}
                </div>
            </div>

            <CreateCardModal show={openUpadCardteModal} onHide={() => setOpenUpadCardteModal(false)} refresh={refresh} />

            <UpdateCardModal show={openEditCard} onHide={() => setOpenEditCard(false)} refresh={refresh} cardId={cardId} />

        </>
    );
}

export default MyCards;
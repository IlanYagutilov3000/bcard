import { FunctionComponent, useEffect, useRef, useState } from "react";
import Card from "../interfaces/Card";
import { deleteCard, getAllCards, likeAndUnlike, /* likeAndUnlike */ } from "../services/cardService";
import { getUserById } from "../services/userService";
import axios from "axios";
import { User } from "../interfaces/User";
import { useUserContext } from "../context/userContext";
import useToken from "../customHooks/useToken";
import { successMsg } from "../services/feedback";

interface HomeProps {

}

const Home: FunctionComponent<HomeProps> = () => {
    const [cards, setCards] = useState<Card[]>([])
    const [cardChanged, setCardChanged] = useState<boolean>(false)
    const { setAuth, auth, isAdmin, isLogedIn, setIsLogedIn, isBusiness, setIsBusiness, setIsAdmin } = useUserContext()
    const { afterDecode } = useToken();
    const { } = useUserContext();
    const [likedCards, setLikedCards] = useState<{ [key: string]: boolean }>({});



    useEffect(() => {
        getAllCards().then((res) => setCards(res.data)).catch((err) => console.log(err)
        )
    }, [cardChanged]);

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

    const handleLikeToggle = (cardId: string) => {
        // Toggle the like status in the state
        setLikedCards((prevLikedCards) => ({
            ...prevLikedCards,
            [cardId]: !prevLikedCards[cardId], // Toggle like status
        }));
    };

    return (
        <>
            <h1 className="display-1">Cards Page</h1>
            <p>Here you can find business cards from all categories</p>
            <div className="container">
                <div className="row mt-3 gap-2 d-flex justify-content-center">
                    {cards.length ? (
                        cards.map((card) => (
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
                                    src={card?.image?.url}
                                    alt={card?.image?.alt}
                                    title={card.title}
                                />
                                <div className="card-body">
                                    <p className="card-text m-0"><span className="fw-bold">Phone:</span> {card.phone}</p>
                                    <p className="card-text m-0"><span className="fw-bold">Address: </span>{card.address.city}</p>
                                    <p className="card-text m-0"><span className="fw-bold">Description: </span>{card.description}</p>
                                    <p className="card-text text-success m-0"><span className="fw-bold">Card Number: </span>{card.bizNumber}</p>
                                </div>
                                <div className="d-flex p-0 justify-content-between">
                                    {isAdmin && <div>
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
                                    </div>}
                                    <div><button className="btn"><i className="fa-solid fa-phone"></i></button></div>
                                    {isLogedIn && <div>
                                        {/* <button className="btn"><i className="fa-solid fa-phone"></i></button> */}
                                        <button className="btn" onClick={() => {
                                            handleLikeToggle(card._id as string)
                                            likeAndUnlike(card._id as string, auth?._id as string)
                                        }} ><i className={`fa-solid fa-heart ${likedCards[card._id as string] ? 'text-danger' : ''
                                            }`}></i></button>
                                    </div>}
                                </div>
                            </div>
                        ))
                    ) : (
                        <span>
                            <div className="loader">
                                <div className="circle">
                                    <div className="dot"></div>
                                    <div className="outline"></div>
                                </div>
                                <div className="circle">
                                    <div className="dot"></div>
                                    <div className="outline"></div>
                                </div>
                                <div className="circle">
                                    <div className="dot"></div>
                                    <div className="outline"></div>
                                </div>
                                <div className="circle">
                                    <div className="dot"></div>
                                    <div className="outline"></div>
                                </div>
                            </div></span>
                    )}
                </div>
            </div>

        </>
    );
}

export default Home;
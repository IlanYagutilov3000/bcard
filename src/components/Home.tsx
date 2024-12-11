import { FunctionComponent, useContext, useEffect, useRef, useState } from "react";
import Card from "../interfaces/Card";
import { deleteCard, getAllCards, likeAndUnlike, /* likeAndUnlike */ } from "../services/cardService";
import { getUserById } from "../services/userService";
import axios from "axios";
import { User } from "../interfaces/User";
import { useUserContext } from "../context/userContext";
import useToken from "../customHooks/useToken";
import { successMsg } from "../services/feedback";
import DeleteCardModal from "./DeleteCardModal";
import UpdateCardModal from "./UpdateCardModal";
import { useSearchContext } from "../context/SeachContext";
import { SiteTheme } from "../App";

interface HomeProps {

}

const Home: FunctionComponent<HomeProps> = () => {
    const [cards, setCards] = useState<Card[]>([])
    const [cardChanged, setCardChanged] = useState<boolean>(false)
    const { setAuth, auth, isAdmin, isLogedIn, setIsLogedIn, isBusiness, setIsBusiness, setIsAdmin } = useUserContext()
    const { afterDecode } = useToken();
    const { } = useUserContext();
    const [likedCards, setLikedCards] = useState<{ [key: string]: boolean }>({});
    const [openDeleteCard, setOpenDeleteCard] = useState<boolean>(false)
    const [openEditCard, setOpenEditCard] = useState<boolean>(false)
    const [cardId, setCardId] = useState<string>("")
    const [bizNumber, setBizzNumber] = useState<number>(0)
    const { search } = useSearchContext()
    const { color, background } = useContext(SiteTheme);


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

    let refresh = () => {
        setCardChanged(!cardChanged)
    }

    const filteredCards = cards.filter((card) => {
        return card.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    })

    return (
        <>
            <h1 className="display-1">Cards Page</h1>
            <p>Here you can find business cards from all categories</p>
            <div className="container appMargin">
                <div className="row mt-3 gap-2 d-flex justify-content-center flex-wrap" >
                    {filteredCards.length ? (
                        filteredCards.map((card) => (
                            <div className="card col-md-4 shadow bg-tertiary rounded" key={card._id} style={{ width: "18rem", backgroundColor: background, color: color }}>
                                <div>
                                    <h5 className="card-title text-center">{card.title}</h5>
                                </div>
                                <img src={card?.image?.url} alt={card?.image?.alt} title={card.title} />
                                <div className="card-body">
                                    <span>{card.subtitle}</span>
                                    <p className="card-text m-0"><span className="fw-bold">Phone:</span> {card.phone}</p>
                                    <p className="card-text m-0"><span className="fw-bold">Address: </span>{card.address.city}</p>
                                    <p className="card-text m-0"><span className="fw-bold">Description: </span>{card.description}</p>
                                    <p className="card-text m-0"><span className="fw-bold">Card Number: </span>{card.bizNumber}</p>
                                </div>
                                <div className="d-flex p-0 justify-content-between">
                                    {isAdmin && (
                                        <div>
                                            <button className="btn" onClick={() => {
                                                setOpenDeleteCard(true);
                                                setCardId(card._id as string);
                                                setBizzNumber(card.bizNumber as number);
                                            }}><i className="fa-solid fa-trash text-danger"></i></button>
                                            <button className="btn" onClick={() => {
                                                setOpenEditCard(true);
                                                setCardId(card._id as string);
                                            }}><i className="fa-solid fa-pen text-success"></i></button>
                                        </div>
                                    )}
                                    <div>
                                        <button className="btn"><i className="fa-solid fa-phone"></i></button>
                                        {isLogedIn && (
                                            <button className="btn" onClick={() => {
                                                handleLikeToggle(card._id as string);
                                                likeAndUnlike(card._id as string, auth?._id as string);
                                            }}><i className={`fa-solid fa-heart ${likedCards[card._id as string] ? 'text-danger' : ''}`}></i></button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
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
                        </div>
                    )}
                </div>
            </div>

            <DeleteCardModal show={openDeleteCard} onHide={() => setOpenDeleteCard(false)} refresh={refresh} cardId={cardId} bizzNumber={bizNumber} />

            <UpdateCardModal show={openEditCard} onHide={() => setOpenEditCard(false)} refresh={refresh} cardId={cardId} />

        </>
    );
}

export default Home;
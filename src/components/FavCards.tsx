import { FunctionComponent, useContext, useEffect, useState } from "react";
import { useUserContext } from "../context/userContext";
import Card from "../interfaces/Card";
import { getAllCards, likeAndUnlike } from "../services/cardService";
import { SiteTheme } from "../App";

interface FavCardsProps {

}

const FavCards: FunctionComponent<FavCardsProps> = () => {
    const [favoriteCards, setFavoriteCards] = useState<Card[]>([]);
    const { auth } = useUserContext();
    const { color, background } = useContext(SiteTheme);

    useEffect(() => {
        if (auth) {
            // Fetch the liked cards based on user ID
            getAllCards().then((res) => {
                const likedCards = res.data.filter((card: any) => card.likes.includes(auth._id)); // Filter liked cards
                setFavoriteCards(likedCards);
            }).catch((err) => console.log(err));
        }
    }, [auth]);

    const handleUnlikeCard = (cardId: string) => {
        // Call the API to unlike the card
        likeAndUnlike(cardId, auth?._id as string).then(() => {
            // Remove the card from the state (local update)
            setFavoriteCards((prevFavorites) =>
                prevFavorites.filter((card) => card._id !== cardId)
            );
        });
    };
    return (
        <>
            
            <div className="container appMargin">
                <h3 className="display-4 text-center">Fav Cards</h3>
                <p className="text-center">Here you can find all your liked cards</p>
                <div className="row mt-3 gap-2 d-flex justify-content-center">
                    {favoriteCards.length ? (
                        favoriteCards.map(card => (
                            <div
                                className="card col-md-4 shadow bg-tertiary rounded"
                                key={card._id}
                                style={{ width: "18rem", backgroundColor: background, color: color }}
                            >
                                <div>
                                    <h5 className="card-title text-center">{card.title}</h5>
                                    
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
                                    <p className="card-text m-0"><span className="fw-bold">Card Number: </span>{card.bizNumber}</p>
                                </div>
                                <div className="d-flex p-0 justify-content-between">
                                    <div>
                                        <button className="btn" onClick={() => {
                                            handleUnlikeCard(card._id as string)
                                        }} ><i className="fa-solid fa-heart"></i></button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                            <p className="text-center">No Liked Cards</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default FavCards;
import { FunctionComponent, useEffect, useState } from "react";
import Card from "../interfaces/Card";
import { getAllCards } from "../services/cardService";
import { getUserById } from "../services/userService";
import axios from "axios";
import { User } from "../interfaces/User";

interface HomeProps {

}

const Home: FunctionComponent<HomeProps> = () => {
    const [cards, setCards] = useState<Card[]>([])
    const [isBusiness, setIsBusiness] = useState<boolean>(false)
    const [loggedIn, setLoggedIn] = useState<boolean>(false)
    useEffect(() => {
        getAllCards().then((res) => setCards(res.data)).catch((err) => console.log(err)
        )
    }, [])
    useEffect(() => {
        getUserById().then((res) => {
            setIsBusiness(res.data.isBusiness)
            setLoggedIn(true)
            /* console.log(isBusiness); */

        }).catch((err) => {
            console.log(err)

        })
    }, []);
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
                                    {/* {isAdmin && <div>
                                        <button>Trash</button>

                                    </div>} */}
                                    {loggedIn && <div>
                                        <button className="btn"><i className="fa-solid fa-phone"></i></button>
                                        <button className="btn"><i className="fa-solid fa-heart "></i></button>
                                    </div>}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No Cards</p>
                    )}
                </div>
            </div>

        </>
    );
}

export default Home;
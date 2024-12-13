import axios from "axios"
import Card from "../interfaces/Card"
import { jwtDecode, JwtPayload } from "jwt-decode"
import { data } from "react-router-dom"
import { useUserContext } from "../context/userContext"
import { successMsg } from "./feedback"


const api: string = `${process.env.REACT_APP_API}/cards`
const token = localStorage.getItem("token")


//gets all cards
export function getAllCards() {
    return axios.get(api)
}

//get card by id
export function getCardById(cardId: string) {
    return axios.get(`${api}/${cardId}`)
}

//get all my cards
export function getMyCards() {
    return axios.get(`${api}/my-cards`, { headers: { "x-auth-token": token } })
}

//Craete new card 
export function createNewCard(newCard: Card) {
    return axios.post(api, newCard, {
        headers: {
            "x-auth-token": token
        }
    })
}

//update card
export function updateCard(cardId: string, updateCard: Card) {
    return axios.put(`${api}/${cardId}`, updateCard, { headers: { "x-auth-token": token } })
}

//like unlike a card
export async function likeAndUnlike(cardId: string, userId: string) {
    try {
        if (!token) throw new Error("No token found");

        const cardResponse = await getCardById(cardId)

        const likes = cardResponse.data.likes;
        const isLiked = likes.includes(userId);

        if (isLiked) {
            cardResponse.data.likes = likes.filter((id: string) => id !== userId);
            successMsg("Card been unliked!");
        } else {
            cardResponse.data.likes.push(userId);
            successMsg("card was liked");
        }

        await axios.patch(`${api}/${cardId}`,
            {
                likes: cardResponse.data.likes,
            },
            {
                headers: {
                    "x-auth-token": token
                }
            }
        );
    } catch (error) {
        console.error("Error status:", error);
    }
}

//patch card bizz number
/* needs to be an object */
export function updateCardBizzNumber(cardId: string, bizzNumber: any) {
    return axios.patch(`${api}/${cardId}`, bizzNumber, { headers: { "x-auth-token": token } })
}

//delete card
export function deleteCard(cardId: string, bizNumber: number) {
    return axios.delete(`${api}/${cardId}`, { headers: { "x-auth-token": token }, data: { bizNumber } })
}
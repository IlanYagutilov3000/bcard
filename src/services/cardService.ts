import axios from "axios"
import Card from "../interfaces/Card"
import { jwtDecode, JwtPayload } from "jwt-decode"
import { data } from "react-router-dom"
/* import { Card } from "react-bootstrap" */

const api: string = `${process.env.REACT_APP_API}/cards`
const token = localStorage.getItem("token")

//gets all the cards
export function getAllCards() {
    return axios.get(api)
}

//get card by id
export function getCarById(cardId: string) {
    return axios.get(`${api}/${cardId}`)
}

//get my cards
export function getMyCards() {
    return axios.get(`${api}/my-cards`, { headers: { "x-auth-token": token } })
}

//Craete new card 
export function createNewCard(newCard: Card) {
    axios.post(api, newCard, {
        headers: {
            "x-auth-token": token
        }
    })
}

//update card

//like unlike a card
export function likeAndUlike(cardId: string) {
    axios.patch(`${api}/${cardId}`, {
        headers: {
            "x-auth-token": token
        }
    })
}

//delete cards
export function deleteCard(cardId: string, bizNumber: number) {
    return axios.delete(`${api}/${cardId}`, { headers: { "x-auth-token": token }, data: { bizNumber } })
}
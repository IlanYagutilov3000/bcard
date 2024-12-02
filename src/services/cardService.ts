import axios from "axios"

const api : string = `${process.env.REACT_APP_API}/cards`

// this function gets all the cards
export function getAllCards(){
    return axios.get(api)
}
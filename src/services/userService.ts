import axios from "axios";
import { User } from "../interfaces/User";
import { jwtDecode, JwtPayload } from "jwt-decode";


const api: string = `${process.env.REACT_APP_API}/users`

export function addNewUser(newUser: User) {
    return axios.post(api, newUser)
}

export function userLogin(email: string, password: string) {
    return axios.post(`${api}/login`, { email, password })
}

export function getUserById() {

    const token = localStorage.getItem("token") as string
    /* if (!token || typeof token !== 'string') {
        console.error("Invalid token");
        return; 
    } */
    if (token === null || token === undefined) {
        console.log("error");
        return Promise.reject("No token found");
    }

    const decoded: any = jwtDecode<JwtPayload>(token)
    /* console.log(decoded._id);
    console.log(token);
    console.log(decoded);
    console.log(`${api}/${decoded._id}`); */
    return axios.get(`${api}/${decoded._id}`, {
        headers: { "x-auth-token": JSON.parse(token) }
    })
}

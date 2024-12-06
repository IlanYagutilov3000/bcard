import axios from "axios";
import { User } from "../interfaces/User";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { UpdatedUser } from "../interfaces/UpdatedUser";


const api: string = `${process.env.REACT_APP_API}/users`
const token = localStorage.getItem("token")


//get all users
export function getAllUsers() {
    return axios.get(api, { headers: { "x-auth-token": token } })
}

//Adds new user
export function addNewUser(newUser: User) {
    return axios.post(api, newUser)
}

//get the token when user is logs in
export function userLogin(email: string, password: string) {
    return axios.post(`${api}/login`, { email, password })
}


//get user by id
export function getUserById() {
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
        headers: { "x-auth-token": token }
    })
}

//get user by id v2
export function getUserByIdTwo(userId: string) {
    return axios.get(`${api}/${userId}`, { headers: { "x-auth-token": token } })
}

//edit user
export function editUser(user: UpdatedUser) {
    const decoded: any = jwtDecode<JwtPayload>(token as string)
    return axios.put(`${api}/${decoded._id}`, user, { headers: { "x-auth-token": token } })
}

/* export function editUser(user: UpdatedUser) {
    return axios.put(`${api}/${user.id}`, user, { headers: { "x-auth-token": token } })
} */

//delete user
export function deleteUser(id: string) {
    return axios.delete(`${api}/${id}`, { headers: { "x-auth-token": token } })
}
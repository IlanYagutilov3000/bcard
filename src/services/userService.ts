import axios from "axios";
import { User } from "../interfaces/User";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { UpdatedUser } from "../interfaces/UpdatedUser";
import { useState } from "react";


const api: string = `${process.env.REACT_APP_API}/users`
const token = localStorage.getItem("token");

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

//get user details by id
export function getUserDetails() {
    if (token === null || token === undefined) {
        console.log("error");
        return Promise.reject("No token found");
    }
    const decoded: any = jwtDecode<JwtPayload>(token)
    return axios.get(`${api}/${decoded._id}`, {
        headers: { "x-auth-token": token }
    })
}

//get user by id v2
export function getUserByIdTwo(userId: string) {
    return axios.get(`${api}/${userId}`, { headers: { "x-auth-token": token } })
}

//edit user
export async function editUser(userId: string, user: UpdatedUser) {
    return await axios.put(`${api}/${userId}`, user, { headers: { "x-auth-token": token } })
}

//patch user status
export function editUserStatus(userId: string, newStatus: boolean){
    return axios.patch(`${api}/${userId}`, newStatus, { headers: { "x-auth-token": token } })
}

//delete user
export function deleteUser(userId: string) {
    return axios.delete(`${api}/${userId}`, { headers: { "x-auth-token": token } })
}
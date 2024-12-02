import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function successMsg(msg: string){
    toast.success(msg, {
        position: "top-center",
        autoClose: 3000
    }) 
}

export function errorMsg(msg: string){
    toast.error(msg, {
        position: "top-center",
        autoClose: 3000
    })
}
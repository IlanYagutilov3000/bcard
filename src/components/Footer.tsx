import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserById } from "../services/userService";

interface FooterProps {

}

const Footer: FunctionComponent<FooterProps> = () => {
    const navigate = useNavigate()
    const [isBusiness, setIsBusiness] = useState<boolean>(false)
    const [loggedIn, setLoggedIn] = useState<boolean>(false)
    useEffect(() => {
        getUserById().then((res) => {
            setIsBusiness(res.data.isBusiness)
            setLoggedIn(true)
            

        }).catch((err) => {
            console.log(err)
            setLoggedIn(false)
        })
    }, []);
    return (
        <>
            <footer className="bg-dark-subtle">
                <div className="d-flex justify-content-center">
                    <div className="d-flex flex-column text-center">
                        <p className="mb-0"><i className="fa-solid fa-circle-exclamation"></i></p>
                        <button className="btn btn-link mx-0 p-0" onClick={() => {
                            navigate('/about')
                        }}>About</button>
                    </div>
                    {loggedIn && <div className="d-flex flex-column text-center ms-2">
                        <p className="mb-0"><i className="fa-solid fa-heart"></i></p>
                        <button className="btn btn-link mx-0 p-0" onClick={() => {
                            navigate('/about')
                        }}>Fav cards</button>
                    </div>}
                    {isBusiness && <div className="d-flex flex-column text-center ms-2">
                        <p className="mb-0"><i className="fa-regular fa-credit-card"></i></p>
                        <button className="btn btn-link mx-0 p-0" onClick={() => {
                            navigate('/about')
                        }}>My cards</button>
                    </div>}
                </div>
            </footer>
        </>
    );
}

export default Footer;
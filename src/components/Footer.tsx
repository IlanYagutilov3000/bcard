import { FunctionComponent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/userContext";
import useToken from "../customHooks/useToken";
import { User } from "../interfaces/User";
import { SiteTheme } from "../App";

interface FooterProps {
    
}

const Footer: FunctionComponent<FooterProps> = () => {
    const { setAuth, auth, isAdmin, isLogedIn, setIsLogedIn, isBusiness, setIsBusiness, setIsAdmin } = useUserContext()
    const { afterDecode } = useToken();
    const navigate = useNavigate()
    const { color, background } = useContext(SiteTheme);

    useEffect(() => {
        if (afterDecode) {
            setAuth(afterDecode);
            setIsLogedIn(true);
            setIsAdmin(afterDecode.isAdmin);
            setIsBusiness(afterDecode.isBusiness);
        } else {
            setIsLogedIn(false);
            setIsAdmin(false);
            setIsBusiness(false)
        }
    }, [useToken, setAuth, isLogedIn, isAdmin, isBusiness]);

    return (
        <>
            <footer className="bg-dark-subtle">
                <div className="d-flex justify-content-around" style={{ backgroundColor: background, color: color }}>
                    <div className="d-flex flex-column text-center">
                        <p className="mb-0"><i className="fa-solid fa-circle-exclamation"></i></p>
                        <button className="btn btn-link mx-0 p-0" onClick={() => {
                            navigate('/about')
                        }}>About</button>
                    </div>
                    {isLogedIn && <div className="d-flex flex-column text-center ms-2">
                        <p className="mb-0"><i className="fa-solid fa-heart"></i></p>
                        <button className="btn btn-link mx-0 p-0" onClick={() => {
                            navigate('/fav-cards')
                        }}>Fav cards</button>
                    </div>}
                    {isBusiness && <div className="d-flex flex-column text-center ms-2">
                        <p className="mb-0"><i className="fa-regular fa-credit-card"></i></p>
                        <button className="btn btn-link mx-0 p-0" onClick={() => {
                            navigate('/my-cards')
                        }}>My cards</button>
                    </div>}
                    {isAdmin && <div className="d-flex flex-column text-center ms-2">
                        <p className="mb-0"><i className="fa-solid fa-user"></i></p>
                        <button className="btn btn-link mx-0 p-0" onClick={() => {
                            navigate('/sandbox')
                        }}>SandBox</button>
                    </div>}
                </div>
            </footer>
        </>
    );
}

export default Footer;
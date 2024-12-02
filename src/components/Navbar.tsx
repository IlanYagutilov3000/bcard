import { createContext, FunctionComponent, useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { SiteTheme } from "../App";
import { getUserById } from "../services/userService";

interface NavbarProps {
    darkMode: boolean;
    setDarkMode: (darkMode: boolean) => void;
}


const Navbar: FunctionComponent<NavbarProps> = ({ darkMode, setDarkMode }) => {
    const theme = useContext(SiteTheme)
    const navigate = useNavigate()
    const [isBusiness, setIsBusiness] = useState<boolean>(false)
    const [loggedIn, setLoggedIn] = useState<boolean>(false)
    useEffect(() => {
        getUserById().then((res) => {
            setLoggedIn(true)
            setIsBusiness(res.data.isBusiness)
            /* console.log(isBusiness); */

        }).catch((err) => {
            console.log(err)

        })
    }, []);
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary" style={{ color: theme.color, backgroundColor: theme.background }}>
                <div className="container-fluid" style={{ color: theme.color, backgroundColor: theme.background }}>
                    <NavLink className="navbar-brand" to={'/'} style={{ color: theme.color, backgroundColor: theme.background }}>BCard</NavLink >
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" >
                        <span className="navbar-toggler-icon" ></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{ color: theme.color, backgroundColor: theme.background }}>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item" >
                                <NavLink className="nav-link active" aria-current="page" to={'/about'} style={{ color: theme.color, backgroundColor: theme.background }}>About</NavLink>
                            </li>
                            {loggedIn && <li className="nav-item" >
                                <NavLink className="nav-link active" aria-current="page" to={'/fav-cards'} style={{ color: theme.color, backgroundColor: theme.background }}>Fav Cards</NavLink>
                            </li>}
                            {isBusiness && <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to={'/my-cards'} style={{ color: theme.color, backgroundColor: theme.background }}>My Cards</NavLink>
                            </li>}
                        </ul>
                        <div className="form-check form-switch" style={{ color: theme.color, backgroundColor: theme.background }}>
                            <input
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                id="flexSwitchCheckDefault"
                                onChange={() => setDarkMode(!darkMode)}
                            />
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                                Dark mode
                            </label>
                        </div>

                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit" >Search</button>
                        </form>
                        {/* need to work on the if logged*/}
                        {loggedIn ? (<><div className="btn-group">
                            <button className="btn btn-secondary btn-lg dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src="logo192.png" alt="asdads" />
                            </button>
                            <ul className="dropdown-menu">
                                <li><button onClick={() => {
                                    localStorage.removeItem("token")
                                    navigate("/login")
                                    setLoggedIn(!loggedIn)
                                }}>logout</button></li>
                            </ul>
                        </div>
                        </>)
                            : (<>
                                <button onClick={() => {
                                    navigate('/signup')
                                }} className="btn btn" style={{ color: theme.color, backgroundColor: theme.background }}>Signup</button>
                                <button onClick={() => {
                                    navigate('/login')
                                }} className="btn btn" style={{ color: theme.color, backgroundColor: theme.background }}>Login</button>
                            </>)}

                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
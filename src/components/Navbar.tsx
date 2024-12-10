import { createContext, FunctionComponent, useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
/* import { SiteTheme } from "../App"; */
import { getUserById, getUserByIdTwo } from "../services/userService";
import { User } from "../interfaces/User";
import { useUserContext } from "../context/userContext";
import useToken from "../customHooks/useToken";
import { useSearchContext } from "../context/SeachContext";

interface NavbarProps {
    darkMode: boolean;
    setDarkMode: (darkMode: boolean) => void;
}


const Navbar: FunctionComponent<NavbarProps> = ({ darkMode, setDarkMode }) => {
    /* const theme = useContext(SiteTheme) */
    const { setAuth, auth, isAdmin, isLogedIn, setIsLogedIn, isBusiness, setIsBusiness, setIsAdmin } = useUserContext()
    const { afterDecode } = useToken();
    const navigate = useNavigate()
    const { search, setSearch } = useSearchContext()
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        if (afterDecode && localStorage.token) {
            getUserById().then((res) => {
                setUser(res.data)
            }).catch((err) => {
                console.log(err)

            })
        }
    }, []);

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

    const handleLogout = () => {
        setAuth(null);
        navigate("/login")
        setIsAdmin(false);
        setIsBusiness(false)
        setIsLogedIn(false);
        setAuth(null)
        localStorage.removeItem("token");
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary" >
                <div className="container-fluid" >
                    <NavLink className="navbar-brand" to={'/'} >BCard</NavLink >
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" >
                        <span className="navbar-toggler-icon" ></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent" >
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item" >
                                <NavLink className="nav-link active" aria-current="page" to={'/about'} >About</NavLink>
                            </li>
                            {isLogedIn && <li className="nav-item" >
                                <NavLink className="nav-link active" aria-current="page" to={'/fav-cards'} >Fav Cards</NavLink>
                            </li>}
                            {isBusiness && <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to={'/my-cards'} >My Cards</NavLink>
                            </li>}
                            {isAdmin && <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to={'/sandbox'} >SandBox</NavLink>
                            </li>}
                        </ul>
                        <div className="form-check form-switch" >
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
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setSearch(e.target.value)} />

                        </form>
                        {isLogedIn ? (<><div className="imgSize">
                            <img src={user?.image?.url} alt={user?.image?.alt} className="ms-2" />
                            <button onClick={() => {
                                handleLogout()
                            }} className="btn " title="Logout" ><i className="fa-solid fa-arrow-right"></i></button>

                        </div>
                        </>)
                            : (<>
                                <button onClick={() => {
                                    navigate('/signup')
                                }} className="btn btn-primary mx-1" /* style={{ color: theme.color, backgroundColor: theme.background }} */>Signup</button>
                                <button onClick={() => {
                                    navigate('/login')
                                }} className="btn btn-warning" /* style={{ color: theme.color, backgroundColor: theme.background }} */>Login</button>
                            </>)}

                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;

import { createContext, FunctionComponent, useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { getUserByIdTwo, getUserDetails } from "../services/userService";
import { User } from "../interfaces/User";
import { useUserContext } from "../context/userContext";
import useToken from "../customHooks/useToken";
import { useSearchContext } from "../context/SeachContext";
import { SiteTheme } from "../App";

interface NavbarProps {
    darkMode: boolean;
    setDarkMode: (darkMode: boolean) => void;
}

const Navbar: FunctionComponent<NavbarProps> = ({ darkMode, setDarkMode }) => {
    const { color, background } = useContext(SiteTheme);
    const { setAuth, auth, isAdmin, isLogedIn, setIsLogedIn, isBusiness, setIsBusiness, setIsAdmin } = useUserContext()
    const { afterDecode } = useToken();
    const navigate = useNavigate()
    const { search, setSearch } = useSearchContext()
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        if (afterDecode && localStorage.token) {
            getUserDetails().then((res) => {
                setUser(res.data)
            }).catch((err) => {
                console.log(err)

            })
        }
    }, []);

    const handleLogout = () => {
        setUser(null)
        setAuth(null);
        navigate("/login")
        setIsAdmin(false);
        setIsBusiness(false)
        setIsLogedIn(false);
        setAuth(null)
        localStorage.removeItem("token");
    };

    const toggleTheme = () => {
        setDarkMode(!darkMode);
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary p-0" style={{ backgroundColor: background, color: color }}  >
                <div className="container-fluid p-3" style={{ backgroundColor: background, color: color }}  >
                    <NavLink className="navbar-brand" to={'/'} style={{ color: color }} >BCard</NavLink >
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" style={{ backgroundColor: background, color: color }} >
                        <span style={{ backgroundColor: background, color: color }}><i className="fa-solid fa-bars"></i></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent" >
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item" >
                                <NavLink className="nav-link active" aria-current="page" to={'/about'} style={{ color: color }} >About</NavLink>
                            </li>
                            {isLogedIn && <li className="nav-item" >
                                <NavLink className="nav-link active" aria-current="page" to={'/fav-cards'} style={{ color: color }} >Fav Cards</NavLink>
                            </li>}
                            {isBusiness && <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to={'/my-cards'} style={{ color: color }} >My Cards</NavLink>
                            </li>}
                            {isAdmin && <li className="nav-item">
                                <NavLink className="nav-link active" aria-current="page" to={'/sandbox'} style={{ color: color }}>SandBox</NavLink>
                            </li>}
                        </ul>
                        <div className="darkThemeBtn me-2" >
                            <i className={darkMode ? "fa-solid fa-sun" : "fa-solid fa-moon"} onClick={toggleTheme}
                                style={{ color: color, backgroundColor: background }}
                                title={darkMode ? "Switch to Light Theme" : "Switch to Dark Theme"}></i>
                        </div>

                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setSearch(e.target.value)} />
                        </form>
                        {isLogedIn && <Link to={`user-edit/${user?._id}`} title="Settings" ><i className="fa-solid fa-gear mx-2 text-warning"></i></Link>}
                        {isLogedIn ? (<><div className="imgSize">
                            <img src={user?.image?.url} alt={user?.image?.alt} className="ms-2" />
                            <button onClick={() => {
                                handleLogout()
                            }} className="btn " title="Logout" ><i className="fa-solid fa-right-from-bracket" style={{ color: color }}></i></button>
                        </div>
                        </>)
                            : (<>
                                <button onClick={() => {
                                    navigate('/signup')
                                }} className="btn btn-primary mx-1" style={{ color: color }}>Signup</button>
                                <button onClick={() => {
                                    navigate('/login')
                                }} className="btn btn-warning" style={{ color: color }}>Login</button>
                            </>)}

                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
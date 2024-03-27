import { NavLink } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../Context/auth-context";

import "./NavLinks.css";

const NavLinks = (props) => {
    const auth = useContext(AuthContext);

    return (
        <ul className="nav-links">
            <li>
                <NavLink to="/" exact>
                    HOME
                </NavLink>
            </li>
            <li>
                <NavLink to="/favorites">FAVORITES</NavLink>
            </li>
            <li>
                <NavLink to="/about">ABOUT</NavLink>
            </li>
            {/* To add conditional based on authentication */}
            {!auth.isLoggedIn ? (
                <li>
                    <NavLink to="/authenticate">LOGIN</NavLink>
                </li>
            ) : (
                <li>
                    <NavLink to="/account">ACCOUNT</NavLink>
                </li>
            )}
        </ul>
    );
};

export default NavLinks;

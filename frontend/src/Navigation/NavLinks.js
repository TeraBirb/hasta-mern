import { NavLink } from "react-router-dom";

import "./NavLinks.css";

const NavLinks = (props) => {
    const isAuthenticated = true; // Replace with your authentication logic

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
            {/* {isAuthenticated ? (
                <li>
                    <NavLink to="/authenticate">LOGIN</NavLink>
                </li>
            ) : (
                <li>
                    <button>LOGIN</button>
                </li>
            )} */}
            <li>
                <NavLink to="/authenticate">LOGIN</NavLink>
            </li>
            <li>
                <NavLink to="/authenticate">LOGOUT</NavLink>
            </li>
        </ul>
    );
};

export default NavLinks;

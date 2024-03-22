import { NavLink } from "react-router-dom";

import "./NavLinks.css";

const NavLinks = (props) => {
    return (
        <ul className="nav-links">
            <li>
                <NavLink to="/" exact>
                    HOME
                </NavLink>
            </li>
            <li>
                <NavLink to="">FAVORITES</NavLink>
            </li>
            <li>
                <NavLink to="">ABOUT</NavLink>
            </li>
            {/* To add conditional based on authentication */}
            <li>
                <button>LOGIN</button>
            </li>
            <li>
                <button>LOGOUT</button>
            </li>
        </ul>
    );
};

export default NavLinks;

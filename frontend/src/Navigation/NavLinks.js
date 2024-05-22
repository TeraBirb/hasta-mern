import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../Context/auth-context";
import "./NavLinks.css";

// Class-based component for demonstartion purposes, can be converted to functional component
class NavLinks extends Component {
    static contextType = AuthContext;

    render() {
        const auth = this.context;

        return (
            <ul className="nav-links">
                <li>
                    <NavLink to="/">
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
    }
}

export default NavLinks;

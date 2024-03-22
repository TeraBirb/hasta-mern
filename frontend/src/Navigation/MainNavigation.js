import React, { useState } from "react";
import { Link } from "react-router-dom";
// import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";

import "./MainNavigation.css";
import Backdrop from "../UIElements/Backdrop";

const MainNavigation = (props) => {
    const [drawerIsOpen, setDrawerIsOpen] = useState(false);

    const openDrawerHandler = () => {
        setDrawerIsOpen(true);
    };

    const closeDrawerHandler = () => {
        setDrawerIsOpen(false);
    };

    return (
        // does not render any real element, just an empty element to fulfill single return value
        <React.Fragment>
            {/* instead of the old && conditional, use boolean prop show */}
            <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
                <nav className="main-navigation__drawer-nav">
                    <NavLinks />
                </nav>
            </SideDrawer>

            {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}

            <header className="main-header">
                <button
                    className="main-navigation__menu-btn"
                    onClick={openDrawerHandler}
                >
                    <span />
                    <span />
                    <span />
                </button>
                <h1 className="main-navigation__title">
                    {/* this could be an image of logo */}
                    <Link to="/">Hasta!</Link>
                </h1>
                <nav className="main-navigation__header-nav">
                    <NavLinks />
                </nav>
            </header>
        </React.Fragment>
    );
};

export default MainNavigation;

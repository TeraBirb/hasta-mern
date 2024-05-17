import React, { Component } from "react";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import "./MainNavigation.css";
import Backdrop from "../UIElements/Backdrop";

class MainNavigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerIsOpen: false
        };
    }

    openDrawerHandler = () => {
        this.setState({ drawerIsOpen: true });
    };

    closeDrawerHandler = () => {
        this.setState({ drawerIsOpen: false });
    };

    render() {
        return (
            <React.Fragment>
                <SideDrawer
                    show={this.state.drawerIsOpen}
                    onClick={this.closeDrawerHandler}
                >
                    <nav className="main-navigation__drawer-nav">
                        <NavLinks />
                    </nav>
                </SideDrawer>

                {this.state.drawerIsOpen && (
                    <Backdrop onClick={this.closeDrawerHandler} />
                )}

                <header className="main-header bg-2">
                    <button
                        className="main-navigation__menu-btn"
                        onClick={this.openDrawerHandler}
                    >
                        <span />
                        <span />
                        <span />
                    </button>
                    <h1 className="main-navigation__title">
                        <Link to="/">Hasta!</Link>
                    </h1>
                    <nav className="main-navigation__header-nav">
                        <NavLinks />
                    </nav>
                </header>
            </React.Fragment>
        );
    }
}

export default MainNavigation;

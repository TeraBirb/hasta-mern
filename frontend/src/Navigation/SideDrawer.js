import React, { Component } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import "./SideDrawer.css";

class SideDrawer extends Component {
    render() {
        const content = (
            <CSSTransition
                in={this.props.show}
                timeout={200}
                classNames="slide-in-left"
                mountOnEnter
                unmountOnExit
            >
                <aside className="side-drawer" onClick={this.props.onClick}>
                    {this.props.children}
                </aside>
            </CSSTransition>
        );
        // renders element in div id="drawer-hook" instead of directly into its original location in mainNavigation
        return ReactDOM.createPortal(content, document.getElementById("drawer-hook"));
    }
}

export default SideDrawer;

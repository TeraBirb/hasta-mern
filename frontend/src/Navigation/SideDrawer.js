import ReactDOM from "react-dom";
// import { ReactDOM } from "react"; // autofill does no work?
// CCS transition for animation
import { CSSTransition } from "react-transition-group";

import "./SideDrawer.css";
const SideDrawer = (props) => {
  const content = (
    <CSSTransition
      in={props.show}
      timeout={200}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      <aside className="side-drawer" onClick={props.onClick}>{props.children}</aside>
    </CSSTransition>
  );
  // renders element in div id="drawer-hook" instead of directly into its original location in mainNavigation
  return ReactDOM.createPortal(content, document.getElementById("drawer-hook"));
};

export default SideDrawer;

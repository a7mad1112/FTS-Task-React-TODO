import React from "react";
import ToggleSideBar from "../side-toggler/ToggleSideBar";
import './header.css'
const Header = () => {
  return (
    <header className="header">
        <div className="d-flex justify-content-end align-items-center">
          <ToggleSideBar />
        </div>
    </header>
  );
};

export default Header;

import React, { useEffect, useState } from "react";
import { BsGithub } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import "./side-bar.css";
import { FaHome, FaCalendarAlt, FaLightbulb, FaMoon } from "react-icons/fa";

const SideBar = () => {
  const location = useLocation();

  const [path, setPath] = useState(location.pathname);

  useEffect(() => {
    setPath(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const value = localStorage.getItem("displayMode") || "";
    if (value === "dark") document.body.classList.add("display-dark");
  }, []);

  const toggleDisplayMode = () => {
    let value = localStorage.getItem("displayMode");
    value = value === "light" ? "dark" : "light";
    localStorage.setItem("displayMode", value);
    value === "dark"
      ? document.body.classList.add("display-dark")
      : document.body.classList.remove("display-dark");
  };
  return (
    <aside id="side">
      <header className="d-flex  justify-content-between align-items-center mb-4">
        <h1 className="text-uppercase">todo</h1>
        <span className="scale-action logo">
          <BsGithub />
        </span>
      </header>

      <ul className="p-0">
        <li>
          <Link to={"/"} className={`${path === "/" && "active"}`}>
            <i className="fs-5">
              <FaHome />
            </i>
            <span>home</span>
          </Link>
        </li>

        <li>
          <Link to={"/today"} className={`${path === "/today" && "active"}`}>
            <i>
              <FaCalendarAlt />
            </i>
            <span>today</span>
          </Link>
        </li>

        <li>
          <Link to={"/week"} className={`${path === "/week" && "active"}`}>
            <i>
              <FaCalendarAlt />
            </i>
            <span>week</span>
          </Link>
        </li>
      </ul>
      <footer>
        <hr />
        <div id="display-mode" onClick={toggleDisplayMode}>
          <span className="light-mode">
            <i>
              <FaLightbulb />
            </i>
          </span>
          <span className="dark-mode">
            <i>
              <FaMoon />
            </i>
          </span>
          <span className="ball"></span>
        </div>
      </footer>
    </aside>
  );
};

export default SideBar;

import React from "react";
import { BsGithub } from "react-icons/bs";
import { Link } from "react-router-dom";
import "./side-bar.css";
import { FaHome, FaCalendarAlt } from "react-icons/fa";

const SideBar = () => {
  return (
    <aside id="side">
      <header className="d-flex  justify-content-between align-items-center mb-4">
        <h1 className="fw-bolder text-uppercase">todo</h1>
        <span className="scale-action logo">
          <BsGithub />
        </span>
      </header>

      <ul className="p-0">
        <li>
          <Link to={"/"} className="active" data-tasks-count="3">
            <i className="fs-5">
              <FaHome />
            </i>
            <span>home</span>
          </Link>
        </li>

        <li>
          <Link to={"/today"} data-tasks-count="1">
            <i>
              <FaCalendarAlt />
            </i>
            <span>today</span>
          </Link>
        </li>

        <li>
          <Link to={"/week"} data-tasks-count="0">
            <i>
              <FaCalendarAlt />
            </i>
            <span>week</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default SideBar;

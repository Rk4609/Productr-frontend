
import React from "react"
import "./Sidebar.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse, faBox } from "@fortawesome/free-solid-svg-icons"
import { NavLink } from "react-router-dom"

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="img">
        <img src="/assets/logo.png" alt="logo" className="log" />
        <input type="search" className="search" placeholder="Search" />
      </div>

      <div className="pages">
        <NavLink
          to="/home/published"
          className={({ isActive }) =>
            isActive ? "nav-item active-nav" : "nav-item"
          }
        >
          <FontAwesomeIcon icon={faHouse} className="icon" />
          Home
        </NavLink>

        <NavLink
          to="/productcard"
          className={({ isActive }) =>
            isActive ? "nav-item active-nav" : "nav-item"
          }
        >
          <FontAwesomeIcon icon={faBox} className="icon" />
          Product
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar


import React from "react"
import "./Sidebar.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse, faBox } from "@fortawesome/free-solid-svg-icons"
import { NavLink } from "react-router-dom"

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="img" style={{display:"flex",justifyContent:"center",alignItems:"center",gap:4}}>
        <h2>AdminX</h2>
        <img src="/assets/Vector (1).png" alt="logo" className="log" style={{height:30,width:30}}/>
        {/* <input
          type="search"
          className="search"
          placeholder="Search Category"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        /> */}
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

// import React from "react"
// import "./Sidebar.css"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faHouse, faBox } from "@fortawesome/free-solid-svg-icons"
// import { NavLink } from "react-router-dom"

// const Sidebar = ({ search, setSearch }) => {
//   return (
//     <div className="sidebar">
//       <div className="img">
//         <img src="/assets/logo.png" alt="logo" className="log" />
//         {/* <input
//           type="search"
//           className="search"
//           placeholder="Search Category"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//         /> */}
//       </div>

//       <div className="pages">
//         <NavLink
//           to="/home/published"
//           className={({ isActive }) =>
//             isActive ? "nav-item active-nav" : "nav-item"
//           }
//         >
//           <FontAwesomeIcon icon={faHouse} className="icon" />
//           Home
//         </NavLink>

//         <NavLink
//           to="/productcard"
//           className={({ isActive }) =>
//             isActive ? "nav-item active-nav" : "nav-item"
//           }
//         >
//           <FontAwesomeIcon icon={faBox} className="icon" />
//           Product
//         </NavLink>
//       </div>
//     </div>
//   )
// }

// export default Sidebar



import React, { useState } from "react"
import "./Sidebar.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse, faBox, faBars } from "@fortawesome/free-solid-svg-icons"
import { NavLink } from "react-router-dom"

const Sidebar = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Mobile Menu Button */}
      <button className="menu-btn" onClick={() => setOpen(true)}>
        <FontAwesomeIcon icon={faBars} />
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="sidebar-overlay"
          onClick={() => setOpen(false)}
        ></div>
      )}

      <div className={`sidebar ${open ? "open" : ""}`}>
        <div className="img">
          <img src="/assets/logo.png" alt="logo" className="log" />
        </div>

        <div className="pages">
          <NavLink
            to="/home/published"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              isActive ? "nav-item active-nav" : "nav-item"
            }
          >
            <FontAwesomeIcon icon={faHouse} className="icon" />
            Home
          </NavLink>

          <NavLink
            to="/productcard"
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              isActive ? "nav-item active-nav" : "nav-item"
            }
          >
            <FontAwesomeIcon icon={faBox} className="icon" />
            Product
          </NavLink>
        </div>
      </div>
    </>
  )
}

export default Sidebar

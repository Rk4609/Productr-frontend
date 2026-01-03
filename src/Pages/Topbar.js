

import React, { useState, useRef, useEffect } from "react"
import "./Topbar.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBox, faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"

const Topbar = ({onMenuClick}) => {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef(null)
  const navigate = useNavigate()

  //  admin data from localStorage
  const admin = JSON.parse(localStorage.getItem("admin"))

  //  close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // logout handler
  const handleLogout = () => {
    localStorage.removeItem("admin")
    navigate("/") 
  }

  return (
    <div className="topbar">
      <header className="top-bar">
        <div className="top-left">
    <button className="hamburger" onClick={onMenuClick}>
      ☰
    </button>

    <p className="pms" style={{fontWeight:500,fontSize:20}}>
      <FontAwesomeIcon icon={faBox} className="icon" style={{fontSize:20}}/>
      Product Management System
    </p>
  </div>
        
        {/* <p>
          <FontAwesomeIcon icon={faBox} className="icon" />
          Product
        </p> */}

        <div className="profile-wrapper" ref={dropdownRef}>
          <img
            src="/assets/admin.png"
            alt="admin"
            className="admin-img"
            onClick={() => setOpen(!open)}
          />

          {open && (
            <div className="profile-dropdown">
              <div className="profile-info">
                <img src="/assets/admin.png" alt="admin" />
                <div>
                  <h4>{admin?.username || "Admin"}</h4>
                  <p>{admin?.email || "admin@gmail.com"}</p>
                </div>
              </div>

              <hr />

              <button className="logout-btn" onClick={handleLogout}>
                <FontAwesomeIcon icon={faRightFromBracket} />
                Logout
              </button>
            </div>
          )}
        </div>
      </header>
    </div>
  )
}

export default Topbar

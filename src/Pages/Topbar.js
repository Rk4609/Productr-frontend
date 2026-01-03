// // import React from 'react'
// // import './Topbar.css'
// // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// // import {  faBox } from "@fortawesome/free-solid-svg-icons"
// // const Topbar = () => {
// //   return (
// //     <div className='topbar'>
// //       <header className='top-bar'>
// //         <p>
// //           <FontAwesomeIcon icon={faBox} className="icon" />
// //           Product
// //         </p>
// //         <img src='/assets/admin.png' alt='admin' className='admin-img' />
// //       </header>
      
// //     </div>
// //   )
// // }

// // export default Topbar

// import React, { useState, useRef, useEffect } from "react"
// import "./Topbar.css"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faBox, faRightFromBracket } from "@fortawesome/free-solid-svg-icons"

// const Topbar = () => {
//   const [open, setOpen] = useState(false)
//   const dropdownRef = useRef(null)

//   // close dropdown on outside click
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setOpen(false)
//       }
//     }
//     document.addEventListener("mousedown", handleClickOutside)
//     return () => document.removeEventListener("mousedown", handleClickOutside)
//   }, [])

//   return (
//     <div className="topbar">
//       <header className="top-bar">
//         <p>
//           <FontAwesomeIcon icon={faBox} className="icon" />
//           Product
//         </p>

//         <div className="profile-wrapper" ref={dropdownRef}>
//           <img
//             src="/assets/admin.png"
//             alt="admin"
//             className="admin-img"
//             onClick={() => setOpen(!open)}
//           />

//           {open && (
//             <div className="profile-dropdown">
//               <div className="profile-info">
//                 <img src="/assets/admin.png" alt="admin" />
//                 <div>
//                   <h4>{admin?.username || "Admin"}</h4>
//                   <p>{admin?.email || "admin@gmail.com"}</p>
//                 </div>
//               </div>

//               <hr />

//               <button className="logout-btn">
//                 <FontAwesomeIcon icon={faRightFromBracket} />
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </header>
//     </div>
//   )
// }

// export default Topbar

import React, { useState, useRef, useEffect } from "react"
import "./Topbar.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBox, faRightFromBracket } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"

const Topbar = () => {
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef(null)
  const navigate = useNavigate()

  // 🔹 admin data from localStorage
  const admin = JSON.parse(localStorage.getItem("admin"))

  // 🔹 close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // 🔹 logout handler
  const handleLogout = () => {
    localStorage.removeItem("admin")
    navigate("/") // login page
  }

  return (
    <div className="topbar">
      <header className="top-bar">
        <p>
          <FontAwesomeIcon icon={faBox} className="icon" />
          Product
        </p>

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

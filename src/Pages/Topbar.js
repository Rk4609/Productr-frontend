import React from 'react'
import './Topbar.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHouse, faBox } from "@fortawesome/free-solid-svg-icons"
const Topbar = () => {
  return (
    <div className='topbar'>
      <header className='top-bar'>
        <p>
          <FontAwesomeIcon icon={faBox} className="icon" />
          Product
        </p>
        <img src='/assets/admin.png' alt='admin' className='admin-img' />
      </header>
      
    </div>
  )
}

export default Topbar

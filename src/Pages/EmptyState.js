import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBorderAll, faPlus } from "@fortawesome/free-solid-svg-icons";
import "./EmptyState.css";
// import { Navigate, useNavigate } from "react-router-dom";

const EmptyState = ({onAddClick}) => {
  return (
    <div className="empty-wrapper">
      <div className="empty-box">
        <div className="icon-wrapper">
          <FontAwesomeIcon icon={faBorderAll} className="grid-icon" />
          <FontAwesomeIcon icon={faPlus} className="plus-icon" />
        </div>

        <h3>Feels a little empty over here...</h3>
        <p>
          You can create products without connecting store <br />
          you can add products to store anytime
        </p>

        <button className="add-btn" onClick={onAddClick}>Add your Products</button>
      </div>
    </div>
  );
};

export default EmptyState;

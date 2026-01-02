


import React from "react";
import Sidebar from "../Pages/Sidebar";
import Topbar from "../Pages/Topbar";
import "./ProductCard.css";
import Product from "../components/Products";

const ProductCard = () => {
  // 🔹 modal open / close state
  // const [open, setOpen] = useState(false);

  return (
    <div className="layout">
      <Sidebar />

      <div className="right-section">
        <Topbar />

        <div className="content">
          {/* Empty state ko function pass kiya */}
          <Product />
        </div>
      </div>

      {/* 🔥 MODAL */}
      {/* {open && <AddProduct onClose={() => setOpen(false)} />} */}
    </div>
  );
};

export default ProductCard;

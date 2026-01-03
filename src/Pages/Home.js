


import React, { useEffect, useState } from "react"
import Sidebar from "../Pages/Sidebar"
import Topbar from "../Pages/Topbar"
import EditProduct from "../components/EditProduct"
import { Outlet, NavLink } from "react-router-dom"
import "./Home.css"

const Home = () => {
  const [products, setProducts] = useState([])

  const [showEditModal, setShowEditModal] = useState(false)
const [selectedProduct, setSelectedProduct] = useState(null)

const handleEdit = (product) => {
  setSelectedProduct(product)
  setShowEditModal(true)
}


  // 🔥 ek hi baar fetch
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/v2/products`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setProducts(data.products)
      })
  }, [])

  // 🔁 publish / unpublish
  const togglePublish = async (id, status) => {
    await fetch(`${process.env.REACT_APP_API_URL}/api/v2/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isPublished: !status }),
    })

    // 🔥 local update
    setProducts(prev =>
      prev.map(p =>
        p._id === id ? { ...p, isPublished: !status } : p
      )
    )
  }


  const deleteProduct = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete?");
  if (!confirmDelete) return;

  const res = await fetch(
    `${process.env.REACT_APP_API_URL}/api/v2/products/${id}`,
    { method: "DELETE" }
  );

  const result = await res.json();

  if (result.success) {
    setProducts(prev => prev.filter(p => p._id !== id));
  }
};

  return (
    <div className="layout">
      <Sidebar />

      <div className="right-section">
        <Topbar />

        <div className="panel1">
          <NavLink to="published"
          className={({isActive}) => isActive ? "tab active-tab" : "tab"}
          >Published</NavLink>

          
          <NavLink to="unpublished"
          className={({isActive}) => isActive ? "tab active-tab" : "tab"}
          >Unpublished</NavLink>
        </div>

        <div className="outlet">
          <Outlet context={{ products, togglePublish ,deleteProduct,onEdit:handleEdit}} />
        </div>

        {showEditModal && (
  <EditProduct
    product={selectedProduct}
    onClose={() => {
      setShowEditModal(false)
      setSelectedProduct(null)
      // optional re-fetch if needed
    }}
  />
)}

      </div>
    </div>
  )
}

export default Home


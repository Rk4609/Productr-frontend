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
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  const handleEdit = (product) => {
    setSelectedProduct(product)
    setShowEditModal(true)
  }

  // fetchProducts
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/v2/products`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setProducts(data.products)
      })
  }, [])

  //  publish / unpublish
  const togglePublish = async (id, status) => {
    await fetch(`${process.env.REACT_APP_API_URL}/api/v2/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isPublished: !status }),
    })

    //  local update
    setProducts((prev) =>
      prev.map((p) => (p._id === id ? { ...p, isPublished: !status } : p))
    )
  }

  const deleteProduct = (id) => {
    setDeleteId(id)
    setShowDeleteModal(true)
  }

  const confirmDeleteProduct = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v2/products/${deleteId}`,
        { method: "DELETE" }
      )

      const result = await res.json()

      if (result.success) {
        setProducts((prev) => prev.filter((p) => p._id !== deleteId))
      }
    } catch (error) {
      alert("❌ Failed to delete product")
    } finally {
      setShowDeleteModal(false)
      setDeleteId(null)
    }
  }

  //  Product update without refresh
  const onUpdateProduct = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p._id === updatedProduct._id ? updatedProduct : p))
    )
  }

  return (
    <div className="layout">
      <Sidebar />

      <div className="right-section">
        <Topbar />

        <div className="panel1">
          <NavLink
            to="published"
            className={({ isActive }) => (isActive ? "tab active-tab" : "tab")}
          >
            Published
          </NavLink>

          <NavLink
            to="unpublished"
            className={({ isActive }) => (isActive ? "tab active-tab" : "tab")}
          >
            Unpublished
          </NavLink>
        </div>

        <div className="outlet">
          <Outlet
            context={{
              products,
              togglePublish,
              deleteProduct,
              onEdit: handleEdit,
            }}
          />
        </div>

        {showEditModal && (
          <EditProduct
            product={selectedProduct}
            onClose={() => {
              setShowEditModal(false)
              setSelectedProduct(null)
            }}
            onUpdate={onUpdateProduct}
          />
        )}

        {showDeleteModal && (
          <div className="delete-overlay">
            <div className="delete-modal">
              <h3>Delete Product</h3>
              <p>Are you sure you want to delete this product?</p>

              <div className="delete-actions">
                <button
                  className="cancel-btn"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button className="confirm-btn" onClick={confirmDeleteProduct}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home

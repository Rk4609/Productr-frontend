

import { useEffect, useState } from "react"
import AddProduct from "../components/AddProduct"
import EditProduct from "./EditProduct"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"

import "./Products.css"

const Product = () => {
  const [search, setSearch] = useState("")  
  const [products, setProducts] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  const fetchProducts = async () => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/v2/products`)
    const result = await res.json()
    if (result.success) setProducts(result.products)
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const filteredProducts =
    search.trim() === ""
      ? products
      : products.filter((item) =>
          item.type?.toLowerCase().includes(search.toLowerCase())
        )

  const togglePublish = async (id, currentStatus) => {
    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/api/v2/products/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: !currentStatus }),
      }
    )
    const result = await res.json()
    if (result.success) fetchProducts()
  }

  const confirmDeleteProduct = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v2/products/${deleteId}`,
        { method: "DELETE" }
      )
      const result = await res.json()
      if (result.success)
        setProducts((prev) => prev.filter((p) => p._id !== deleteId))
    } catch (error) {
      alert(" Failed to delete product")
    } finally {
      setShowDeleteModal(false)
      setDeleteId(null)
    }
  }

  const onUpdateProduct = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p._id === updatedProduct._id ? updatedProduct : p))
    )
  }

  return (
    <div className="p-main">
      <div className="product-header">
  <h2 className="page-title">Products</h2>

  <div className="header-right">
    <div className="search-box">
      <input
        type="text"
        placeholder="Search category..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>

    <button className="add-btn" onClick={() => setShowModal(true)}>
      + Add Product
    </button>
  </div>
</div>


      <div className="product-grid">
        {filteredProducts.length === 0 ? (
          <p>Product loading....{search}"</p>
        ) : (
          filteredProducts.map((item) => (
            <div className="product-card" key={item._id}>
              <div className="img-wrap">
                <img src={item.images?.[0]} alt={item.productName} />
              </div>
              <div className="product-info">
                <h4 className="title">{item.productName}</h4>
                <p>
                  <span>Category:</span> {item.type}
                </p>
                <p>
                  <span>Brand:</span> {item.brand}
                </p>
                <p>
                  <span>Quantity:</span> {item.quantity}
                </p>
                <p>
                  <span>MRP:</span> {item.mrp}
                </p>
                <p>
                  <span>Selling Price:</span> {item.sellingPrice}
                </p>
                <p>
                  <span>Returnable:</span> {item.isReturnable ? "Yes" : "No"}
                </p>

                <div className="actions">
                  <button
                    className={`publish-btn ${
                      item.isPublished ? "published" : "unpublished"
                    }`}
                    onClick={() => togglePublish(item._id, item.isPublished)}
                  >
                    {item.isPublished ? "Unpublish" : "Publish"}
                  </button>

                  <button
                    className="edit-btn"
                    onClick={() => {
                      setSelectedProduct(item)
                      setShowEditModal(true)
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => {
                      setDeleteId(item._id)
                      setShowDeleteModal(true)
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <AddProduct
          onClose={() => {
            setShowModal(false)
            fetchProducts()
          }}
        />
      )}

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
  )
}

export default Product

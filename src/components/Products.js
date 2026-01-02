import { useEffect, useState } from "react"
import AddProduct from "../components/AddProduct"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"

import "./Products.css"
import EditProduct from "./EditProduct"

const Product = () => {
  const [products, setProducts] = useState([])
  const [showModal, setShowModal] = useState(false)

  const [showEditModal, setShowEditModal] = useState(false)
const [selectedProduct, setSelectedProduct] = useState(null)


  const fetchProducts = async () => {
    const res = await fetch("http://localhost:3000/api/v2/products")
    const result = await res.json()

    if (result.success) {
      setProducts(result.products)

    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])



  const togglePublish = async (id, currentStatus) => {
  const res = await fetch(
    `http://localhost:3000/api/v2/products/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        isPublished: !currentStatus,
      }),
    }
  )

  const result = await res.json()

  if (result.success) {
    fetchProducts() 
  }
}


const deleteProduct = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete?");
  if (!confirmDelete) return;

  const res = await fetch(
    `http://localhost:3000/api/v2/products/${id}`,
    { method: "DELETE" }
  );

  const result = await res.json();

  if (result.success) {
    setProducts(prev => prev.filter(p => p._id !== id));
  }
};




  return (
    <div className="p-main">
      <div className="header">
        <h2>Products</h2>
        <button className="add-btn" onClick={() => setShowModal(true)}>
          + Add Product
        </button>
      </div>
      <div className="product-grid">
        {products.map((item) => (
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
                <span>MRP : {item.mrp}</span>
              </p>
              <p>
                <span>Sellingprice : {item.sellingPrice}</span>
              </p>
              <p>
                <span>Returnable:</span> {item.isReturnable ? "Yes" : "No"}
              </p>

              <div className="actions">

                <button
                  className={`publish-btn ${
                    item.isPublished ? "published" : "unpublished" }`}
                  onClick={() => togglePublish(item._id, item.isPublished)}>
                  {item.isPublished ? "Unpublish" : "Publish"}
                </button>

                <button className="edit-btn" onClick={()=>{
                  setSelectedProduct(item)
                  setShowEditModal(true)
                }}>Edit</button>

                <button className="delete-btn"
                onClick={()=>deleteProduct(item._id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
  
      {showModal && (
        <AddProduct
          onClose={() => {
            setShowModal(false)
            fetchProducts()
          }}
        />
      )}

      {
        showEditModal && (
          <EditProduct product={selectedProduct}
          onClose={()=>{
            setShowEditModal(false)
            setSelectedProduct(null)
            fetchProducts()
          }}
          />
        )
      }
    </div>
  )
}

export default Product

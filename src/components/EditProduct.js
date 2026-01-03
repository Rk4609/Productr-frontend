import { useState } from "react"
import "./AddProduct.css"

const EditProduct = ({ product, onClose, onUpdate }) => {
  const [showSuccess, setShowSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    productName: product.productName,
    type: product.type,
    quantity: product.quantity,
    mrp: product.mrp,
    sellingPrice: product.sellingPrice,
    brand: product.brand,
    isReturnable: product.isReturnable,
    isPublished: product.isPublished,
    images: [],
  })

  const handleChange = (e) => {
    const { name, value, type, files } = e.target

    if (type === "file") {
      setFormData({ ...formData, images: files })
    } else if (name === "isReturnable") {
      setFormData({ ...formData, isReturnable: value === "true" })
    } else if (name === "isPublished") {
      setFormData({ ...formData, isPublished: value === "true" })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const data = new FormData()
      Object.keys(formData).forEach((key) => {
        if (key === "images") {
          for (let img of formData.images) {
            data.append("images", img)
          }
        } else {
          data.append(key, formData[key])
        }
      })

      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v2/products/${product._id}`,
        {
          method: "PUT",
          body: data,
        }
      )

      const result = await res.json()

      if (result.success) {
        onUpdate(result.product)
        setShowSuccess(true)
        setTimeout(() => {
          setShowSuccess(false)
          onClose()
        }, 2000)
      } else {
        alert("❌ Update failed")
      }
    } catch (error) {
      console.error(error)
      alert("❌ Server error. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="modal-overlay">
        <div className="modal-box">
          <h3>Edit Product</h3>

          <form onSubmit={handleSubmit}>
            <label>Product Name</label>
            <input
              name="productName"
              value={formData.productName}
              onChange={handleChange}
            />

            <label>Product Type</label>
            <select name="type" value={formData.type} onChange={handleChange}>
              <option value="Food">Food</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothes">Clothes</option>
              <option value="Beauty">Beauty</option>
              <option value="Others">Others</option>
            </select>

            <label>Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
            />

            <label>MRP</label>
            <input
              type="number"
              name="mrp"
              value={formData.mrp}
              onChange={handleChange}
            />

            <label>Selling Price</label>
            <input
              type="number"
              name="sellingPrice"
              value={formData.sellingPrice}
              onChange={handleChange}
            />

            <label>Brand</label>
            <input
              name="brand"
              value={formData.brand}
              onChange={handleChange}
            />

            <label>Upload New Images (optional)</label>
            <input type="file" name="images" multiple onChange={handleChange} />

            <label>Returnable</label>
            <select
              name="isReturnable"
              value={formData.isReturnable.toString()}
              onChange={handleChange}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>

            <div className="modal-actions">
              <button type="button" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" disabled={loading}>
                {loading ? "Updating..." : "Updated"}
              </button>
            </div>
          </form>
        </div>
      </div>
      {showSuccess && (
        <div className="success-toast">✅ Product updated successfully</div>
      )}
    </>
  )
}

export default EditProduct

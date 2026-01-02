import { useState } from "react"
import "./AddProduct.css"

const AddProduct = ({ onClose }) => {
  const [formData, setFormData] = useState({
    productName: "",
    type: "Food",
    quantity: "",
    mrp: "",
    sellingPrice: "",
    brand: "",
    isReturnable: false,
    isPublished: true,
    images: [],
  })

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target

    if (type === "file") {
      setFormData({ ...formData, images: files })
    } else if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked })
    } else if (name === "isReturnable") {
      // 🔥 Yes / No → boolean
      setFormData({ ...formData, isReturnable: value === "true" })
    } else if (name === "isPublished") {
      setFormData({ ...formData, isPublished: value === "true" })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  // 🔹 3. Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault()

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

    const res = await fetch("http://localhost:3000/api/v2/products", {
      method: "POST",
      body: data,
    })

    const result = await res.json()

    if (result.success) {
      alert("✅ Product Created")
      onClose()
    } else {
      alert("❌ Error while creating product")
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>Add Product</h3>

        <form onSubmit={handleSubmit}>
          <label>Product Name</label>
          <input
            name="productName"
            placeholder="Enter product name"
            onChange={handleChange}
            required
          />

          <label>Product Type</label>
          <select name="type" onChange={handleChange}  required>
            <option value="Food">Food</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothes">Clothes</option>
            <option value="Beauty">Beauty</option>
            <option value="Others">Others</option>
            
          </select>

          <label>Quantity</label>
          <input
            name="quantity"
            type="number"
            placeholder="Total stock"
            onChange={handleChange}
             required
          />

          <label>MRP</label>
          <input
            name="mrp"
            type="number"
            placeholder="MRP"
            onChange={handleChange}
             required
          />

          <label>Selling Price</label>
          <input
            name="sellingPrice"
            type="number"
            placeholder="Selling price"
            onChange={handleChange}
             required
          />

          <label>Brand</label>
          <input
            name="brand"
            placeholder="Brand name"
            onChange={handleChange}
             required
          />

          <label>Upload Product Images</label>
          <input type="file" name="images" multiple onChange={handleChange}  required />

          <label>Exchange / Return Eligibility</label>
          <select name="isReturnable" onChange={handleChange}  required >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>

          {/* <label>Publish Product</label>
          <select name="isPublished" onChange={handleChange}  required >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select> */}

          <div className="modal-actions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">Create</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddProduct

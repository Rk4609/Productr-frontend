import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"

const ProductCardUI = ({ products, onToggle,onDelete,onEdit}) => {
  return (
    <div className="product-grid">
      {products.map((item) => (
        <div className="product-card" key={item._id}>
          <div className="img-wrap">
            <img src={item.images?.[0]} alt={item.productName} />
          </div>

          <div className="product-info">
            <h4>{item.productName}</h4>
            <p>Category: {item.type}</p>
            <p>Brand: {item.brand}</p>
            <p>Qty: {item.quantity}</p>
            <p>MRP: {item.mrp}</p>
            <p>Selling: {item.sellingPrice}</p>

            <div className="actions">
              <button
                className={`publish-btn ${
                  item.isPublished ? "published" : "unpublished"
                }`}
                onClick={() => onToggle(item._id, item.isPublished)}
              >
                {item.isPublished ? "Unpublish" : "Publish"}
              </button>

              <button className="edit-btn" onClick={()=>onEdit && onEdit(item)}>Edit</button>
              <button
                className="delete-btn"
                onClick={() => onDelete(item._id)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductCardUI

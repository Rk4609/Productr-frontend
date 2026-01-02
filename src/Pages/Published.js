


import { useOutletContext } from "react-router-dom"
import ProductCardUI from "../components/ProductCardUI"

const Published = () => {
  const { products, togglePublish,deleteProduct,onEdit } = useOutletContext()

  const publishedProducts = products.filter(p => p.isPublished)

  return (
    <ProductCardUI
      products={publishedProducts}
      onToggle={togglePublish}
      onDelete={deleteProduct}
      onEdit={onEdit}
    />
  )
}

export default Published


// export default Published
import { useOutletContext } from "react-router-dom"
import ProductCardUI from "../components/ProductCardUI"

const Unpublished = () => {
  const { products, togglePublish,deleteProduct,onEdit } = useOutletContext()

  const unpublishedProducts = products.filter(p => !p.isPublished)

  return (
    <ProductCardUI
      products={unpublishedProducts}
      onToggle={togglePublish}
      onDelete={deleteProduct}
      onEdit={onEdit}
    />
  )
}

export default Unpublished

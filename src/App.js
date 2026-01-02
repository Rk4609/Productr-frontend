import { BrowserRouter, Routes, Route } from "react-router-dom"
import { LoginPage } from "./components/LoginPage"
import Signup from "./components/Signup"
import Products from "./components/Products"
import ProductCard from "./Pages/ProductCard"
import Home from "./Pages/Home"
import AddProduct from "./components/AddProduct"
import Published from "./Pages/Published"
import UnPublished from "./Pages/UnPublished"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/products" element={<Products />} />
        <Route path="/productcard" element={<ProductCard />} />

        <Route path="/add-product" element={<AddProduct />} />

        <Route path="/home" element={<Home />}>
        <Route path="published" element={<Published />} />
        <Route path="unpublished" element={<UnPublished />} />
        </Route>
        
       
      </Routes>
    </BrowserRouter>
  )
}

export default App

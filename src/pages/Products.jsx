import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Product.css";

function Products({ cart, setCart }) {

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8080/api/products")
      .then((response) => {
        console.log("DATA:", response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // Search filter
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="products-container">

      <h2>Products</h2>

      <input
        type="text"
        placeholder="Search Products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <div key={product.id} className="product-card">
            <img
  src={product.imageUrl}
  alt={product.name}
  className="product-image"
/>
            <h3>{product.name}</h3>
            <p>Price: ₹{product.price}</p>
            <p>{product.description}</p>

            <button
  onClick={() => {
  const exists = cart.find((item) => item.id === product.id);

  if (exists) {
    const updatedCart = cart.map((item) =>
      item.id === product.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    setCart(updatedCart);

  } else {
    setCart([...cart, { ...product, quantity: 1 }]);
  }
}}
>
  Add to Cart 🛒
</button>
          </div>
        ))
      ) : (
        <p>No products found 😔</p>
      )}

    </div>
  );
}

export default Products;
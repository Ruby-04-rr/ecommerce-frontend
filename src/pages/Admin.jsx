import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Admin.css";

function Admin() {
  const [id, setId] = useState(null);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const response = await axios.get("http://localhost:8080/api/products");
    setProducts(response.data);
  };

  const saveProduct = async () => {
    if (!name || !price || !description || !imageUrl) {
      alert("Please fill all fields!");
      return;
    }

    let product;

if (id === null) {
  product = {
    name,
    price,
    description,
    imageUrl,
  };
} else {
  product = {
    id,
    name,
    price,
    description,
    imageUrl,
  };
}

    try {
      if (id === null) {
        await axios.post("http://localhost:8080/api/products", product);
        alert("✅ Product Added Successfully!");
      } else {
        await axios.put("http://localhost:8080/api/products", product);
        alert("✅ Product Updated Successfully!");
      }

      setId(null);
      setName("");
      setPrice("");
      setDescription("");
      setImageUrl("");

      loadProducts();

    } catch (error) {
      console.log(error);
    }
  };

  const editProduct = (product) => {
    setId(product.id);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
    setImageUrl(product.imageUrl);
  };

  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:8080/api/products/${id}`);
    alert("🗑️ Product Deleted Successfully!");
    loadProducts();
  };

  return (
  <div className="admin-container">
      <h2>👨‍💼 Admin Panel</h2>

      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <br /><br />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Image URL"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />

      <br /><br />

      <button className="save-btn" onClick={saveProduct}>
        {id === null ? "➕ Add Product" : "✏️ Update Product"}
      </button>

      <hr />

      <h3>All Products</h3>

      {products.map((product) => (
        <div key={product.id} className="admin-product-card">
          <b>{product.name}</b>

          <br />

          ₹{product.price}

          <br /><br />

          <button className="edit-btn" onClick={() => editProduct(product)}>
            ✏️ Edit
          </button>

          <button
  className="delete-btn"
  onClick={() => deleteProduct(product.id)}
>
            ❌ Delete
          </button>

          <hr />
        </div>
      ))}
    </div>
  );
}

export default Admin;

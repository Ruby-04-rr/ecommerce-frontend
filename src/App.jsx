import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import Admin from "./pages/Admin";
import Payment from "./pages/Payment";

function App() {
  const [cart, setCart] = useState([]);
  const [loggedUser, setLoggedUser] = useState(null);
  const [orders, setOrders] = useState([]);

  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const removeFromCart = (index) => {
    setCart((prevCart) =>
      prevCart.filter((_, i) => i !== index)
    );
  };

  const increaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <div className="App">
      <Navbar
        cart={cart}
        loggedUser={loggedUser}
        setLoggedUser={setLoggedUser}
      />

      <Routes>
        <Route
          path="/"
          element={<h1>Welcome to Ecommerce Website 🛒</h1>}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/login"
          element={<Login setLoggedUser={setLoggedUser} />}
        />

        <Route
          path="/products"
          element={
            <Products cart={cart} setCart={setCart} />
          }
        />

        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              removeFromCart={removeFromCart}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
            />
          }
        />

        <Route
          path="/checkout"
          element={
            <Checkout
              cart={cart}
              setCustomerDetails={setCustomerDetails}
            />
          }
        />

        <Route
          path="/payment"
          element={
            <Payment
              cart={cart}
              orders={orders}
              setOrders={setOrders}
              setCart={setCart}
              customerDetails={customerDetails}
            />
          }
        />

        <Route
          path="/orders"
          element={<Orders orders={orders} />}
        />

        <Route
          path="/admin"
          element={<Admin />}
        />
      </Routes>
    </div>
  );
}

export default App;
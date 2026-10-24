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
  const [showCheckout, setShowCheckout] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  // Temporary (Checkout.jsx-ku thevai)
  const [orders, setOrders] = useState([]);

  // Remove product
  const removeFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  };

  // Increase quantity
  const increaseQuantity = (id) => {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );

    setCart(updatedCart);
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    const updatedCart = cart
      .map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);
  };

  const [customerDetails, setCustomerDetails] = useState({
  name: "",
  address: "",
  phone: ""
});

  return (
  <div className="App">
      <Navbar
        cart={cart}
        loggedUser={loggedUser}
        setLoggedUser={setLoggedUser}
      />

      <h1>Welcome to Ecommerce Website 🛒</h1>

      <Register />

      <Login setLoggedUser={setLoggedUser} />

      <Products
        cart={cart}
        setCart={setCart}
      />

      <Cart
        cart={cart}
        removeFromCart={removeFromCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        setShowCheckout={setShowCheckout}
      />

      {showCheckout && (
       <Checkout
  cart={cart}
  setShowCheckout={setShowCheckout}
  setShowPayment={setShowPayment}
  setCustomerDetails={setCustomerDetails}
/>
      )}
      {showPayment && (
  <Payment
  cart={cart}
  orders={orders}
  setOrders={setOrders}
  setCart={setCart}
  setShowCheckout={setShowCheckout}
  setShowPayment={setShowPayment}
  customerDetails={customerDetails}
/>
)}
      <Orders />

<hr />

<Admin />
    </div>
  );
}

export default App;
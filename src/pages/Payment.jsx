import { useState } from "react";
import axios from "axios";
import "../styles/Payment.css";

function Payment({
  cart,
  orders,
  setOrders,
  setCart,
  setShowCheckout,
  setShowPayment,
  customerDetails
}) {

  const [paymentMethod, setPaymentMethod] = useState("");

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const payNow = async () => {

    if (!paymentMethod) {
      alert("Please select a payment method!");
      return;
    }

    const orderData = {
  customerName: customerDetails.name,
  address: customerDetails.address,
  phone: customerDetails.phone,
  totalAmount: total
};

    try {

      // Save order to MySQL
      await axios.post("http://localhost:8080/api/orders", orderData);

      alert("🎉 Payment Successful!");

      // Temporary React state
      setOrders([...orders, cart]);

      // Empty cart
      setCart([]);

      // Close pages
      setShowPayment(false);
      setShowCheckout(false);

    } catch (error) {
      console.log(error);
      alert("Payment Failed!");
    }

  };

  return (
  <div className="payment-container">

      <h2>💳 Payment</h2>

      <h3>Total Amount : ₹{total}</h3>

      <h4>Select Payment Method</h4>

      <label>
        <input
          type="radio"
          value="Cash on Delivery"
          checked={paymentMethod === "Cash on Delivery"}
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
        Cash on Delivery
      </label>

      <br /><br />

      <label>
        <input
          type="radio"
          value="UPI"
          checked={paymentMethod === "UPI"}
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
        UPI
      </label>

      <br /><br />

      <label>
        <input
          type="radio"
          value="Debit Card"
          checked={paymentMethod === "Debit Card"}
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
        Debit / Credit Card
      </label>

      <br /><br />

      <button onClick={payNow}>
        💳 Pay Now
      </button>

    </div>
  );
}

export default Payment;
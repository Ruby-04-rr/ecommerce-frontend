import { useState } from "react";
import "../styles/Checkout.css";

function Checkout({
  cart,
  setShowCheckout,
  setShowPayment,
  setCustomerDetails
}) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const proceedToPayment = () => {
    if (!name || !address || !phone) {
      alert("Please fill all details!");
      return;
    }
    setCustomerDetails({
   name,
   address,
   phone
});
    // Close checkout
    setShowCheckout(false);

    

    // Open payment page
    setShowPayment(true);
  };

  return (
  <div className="checkout-container">
      <h2>Checkout 🛍️</h2>

      <input
        type="text"
        placeholder="Enter your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <textarea
        placeholder="Enter your Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Enter your Phone Number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <br /><br />

      <button onClick={proceedToPayment}>
        💳 Proceed to Payment
      </button>
    </div>
  );
}

export default Checkout;

import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/Orders.css";

function Orders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/orders")
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
  <div className="orders-container">
      <h2>My Orders 📦</h2>

      {orders.length === 0 ? (
        <p>No Orders Yet 😔</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="order-card">
            <h3>Order #{order.id}</h3>

            <p><strong>Name:</strong> {order.customerName}</p>
            <p><strong>Address:</strong> {order.address}</p>
            <p><strong>Phone:</strong> {order.phone}</p>
            <p><strong>Total Amount:</strong> ₹{order.totalAmount}</p>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;
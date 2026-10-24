import "../styles/Cart.css";

function Cart({
  cart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  setShowCheckout
}) {

  const total = cart.reduce((sum, product) => {
    return sum + product.price * product.quantity;
  }, 0);

  return (
    <div className="cart-container">

      <h2>Your Cart 🛒</h2>

      {cart.length === 0 ? (
        <p className="empty-cart">Cart is empty 😔</p>
      ) : (
        <>
          {cart.map((product, index) => (
            <div key={index} className="cart-card">

              <img
                src={product.imageUrl}
                alt={product.name}
                className="cart-image"
              />

              <div className="cart-details">
                <h3>{product.name}</h3>

                <p>₹{product.price}</p>

                <div className="quantity-box">

                  <button
                    onClick={() => decreaseQuantity(product.id)}
                  >
                    -
                  </button>

                  <span>{product.quantity}</span>

                  <button
                    onClick={() => increaseQuantity(product.id)}
                  >
                    +
                  </button>

                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(index)}
                >
                  ❌ Remove
                </button>

              </div>

            </div>
          ))}

          <div className="cart-total">
            <h2>Total : ₹{total}</h2>

            <button
              className="checkout-btn"
              onClick={() => setShowCheckout(true)}
            >
              Proceed To Checkout 🛍️
            </button>

          </div>

        </>
      )}

    </div>
  );
}

export default Cart;

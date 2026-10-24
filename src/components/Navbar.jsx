import { Link } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar({ cart, loggedUser, setLoggedUser }) {

  const logout = () => {
    setLoggedUser(null);
  };

  return (
    <nav>
      <h2>Ruby Ecommerce 🛒</h2>

      <ul>
        <li>
  <Link to="/">Home</Link>
</li>
        <li>
  <Link to="/products">Products</Link>
</li>

        {
          loggedUser ? (
            <>
              <li>Welcome {loggedUser.name} 😊</li>
              <li onClick={logout}>Logout</li>
            </>
          ) : (
            <>
              <li>
  <Link to="/login">Login</Link>
</li>
              <li>
  <Link to="/register">Register</Link>
</li>
            </>
          )
        }

        <li>Cart ({cart.length})</li>
      </ul>

    </nav>
  );
}

export default Navbar;
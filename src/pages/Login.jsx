import { useState } from "react";
import axios from "axios";
import "../styles/Login.css";

function Login({ setLoggedUser }) {

  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };


  const loginUser = async () => {

    try {

      const response = await axios.post(
        "http://localhost:8080/api/users/login",
        user
      );

      if(response.data) {

  setLoggedUser(response.data);

  alert("Login Successful!");
  console.log(response.data);

}
      else {
        alert("Invalid Email or Password");
      }

    } catch(error) {

      console.log(error);
      alert("Invalid Email or Password");

    }

  };


  return (
  <div className="login-container">

      <h2>👤 User Login</h2>

      <input
        type="email"
        name="email"
        placeholder="Enter Email"
        onChange={handleChange}
      />

      <br />

      <input
        type="password"
        name="password"
        placeholder="Enter Password"
        onChange={handleChange}
      />

      <br />

      <button onClick={loginUser}>
        Login
      </button>

    </div>
  );
}

export default Login;
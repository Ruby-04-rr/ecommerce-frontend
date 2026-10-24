import { useState } from "react";
import axios from "axios";
import "../styles/Register.css";

function Register() {

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const registerUser = async () => {

    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/register",
        user
      );

      console.log(response.data);
      alert("Registration Successful!");

    } catch (error) {
  console.log(error);

  if(error.response && error.response.data){
    alert(error.response.data);
  }
  else{
    alert("Something went wrong");
  }
}

  };


  return (
  <div className="register-container">
      <h2>📝 User Registration</h2>

      <input
        type="text"
        name="name"
        value={user.name}
        placeholder="Enter Name"
        onChange={handleChange}
      />
      <br />
<input
  type="email"
  name="email"
  value={user.email}
  placeholder="Enter Email"
  onChange={handleChange}
/>
      
      <br />
<input
  type="password"
  name="password"
  value={user.password}
  placeholder="Enter Password"
  onChange={handleChange}
/>
      
      <br />

      <button onClick={registerUser}>
        Register
      </button>

    </div>
  );
}

export default Register;
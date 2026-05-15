import "./register.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Register() {
  let [error, setError] = useState("");
  let navigate = useNavigate();
  let handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    let username = formData.get("username");
    let email = formData.get("email");
    let password = formData.get("password");
    try {
      let res = await axios.post("http://localhost:5000/auth/register", {
        username,
        email,
        password,
      });
      console.log(res.data);

      navigate("/login");
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  };
  return (
    <div className="register">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Create an Account</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="email" type="text" placeholder="Email" />
          <input name="password" type="password" placeholder="Password" />
          <button>Register</button>
          {error && <span>{error}</span>}
          <Link to="/login">Do you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Register;

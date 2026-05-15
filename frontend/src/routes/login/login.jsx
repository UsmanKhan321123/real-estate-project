import axios from "axios";
import "./login.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import apiRequest from "../../lib/apiRequest";
function Login() {
  let [error, setError] = useState();
  let navigate = useNavigate();
  let handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    let username = formData.get("username");
    let password = formData.get("password");
    try {
      let res = await apiRequest.post("/auth/login", {
        username,
        password,
      });
      console.log(res.data);
      
      localStorage.setItem("userData", JSON.stringify(res.data));
      navigate("/");
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input name="username" type="text" placeholder="Username" />
          <input name="password" type="password" placeholder="Password" />
          <button>Login</button>
          {error && <span>{error}</span>}
          <Link to="/register">{"Don't"} you have an account?</Link>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;

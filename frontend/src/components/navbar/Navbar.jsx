import { useContext, useState } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { AurhContext } from "../../context/authContext";

function Navbar() {
  const [open, setOpen] = useState(false);
  let {currentUser} = useContext(AurhContext)
  // const user = false;
  return (
    <nav>
      <div className="left">
        <a href="/" className="logo">
          <img src="/logo.png" alt="" />
          <span>My Real Estate</span>
        </a>
        {/* <a href="/">Home</a> */}
        <Link to="/">Home</Link>
        {/* <a href="/">About</a> */}
        <Link to="/">About</Link>

        {/* <a href="/">Contact</a> */}
        <Link to="/">Contact</Link>

        {/* <a href="/">Agents</a> */}
        <Link to="/">Agents</Link>

      </div>
      <div className="right">
        {currentUser ? (
          <div className="user">
            <img
              src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt=""
            />
            <span>{currentUser.username}</span>
            <Link to="/profile" className="profile">
              <div className="notification">3</div>
              <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            {/* <a href="/login">Sign in</a> */}
        <Link to="/login">Sign in</Link>
{/* 
            <a href="/register" className="register">
              Sign up
            </a> */}
        <Link to="/register">Sign up</Link>

          </>
        )}
        <div className="menuIcon">
          <img
            src="/menu.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />
        </div>
        <div className={open ? "menu active" : "menu"}>
          {/* <a href="/">Home</a> */}
        <Link to="/">Home</Link>

          {/* <a href="/">About</a> */}
        <Link to="/">About</Link>

          {/* <a href="/">Contact</a> */}
        <Link to="/">Contact</Link>

          {/* <a href="/">Agents</a> */}
        <Link to="/">Agents</Link>

          {/* <a href="../../routes/login/login.jsx">Sign in</a> */}
        <Link to="/">Sign in</Link>

          {/* <a href="../../routes/register/register.jsx">Sign up</a> */}
        <Link to="/register">Sign up</Link>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
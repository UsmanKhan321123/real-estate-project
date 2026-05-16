import "./layout.scss";
import Navbar from "../../components/navbar/Navbar";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AurhContext } from "../../context/authContext";

function Layout() {
  return (
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

function RequireAuth() {
  let { currentUser } = useContext(AurhContext);
  let navigate = useNavigate();
  if (!currentUser) {
    navigate("/login");
  }
  return (
    !currentUser ? <Navigate to="/login"/> : (
      <div className="layout">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    )
  );
}

// function RequireAuth() {
//   let { currentUser } = useContext(AurhContext);

//   return !currentUser ? (
//     <Navigate to="/login" />
//   ) : (
//     <div className="layout">
//       <div className="navbar">
//         <Navbar />
//       </div>
//       <div className="content">
//         <Outlet />
//       </div>
//     </div>
//   );
// }

export { Layout, RequireAuth };

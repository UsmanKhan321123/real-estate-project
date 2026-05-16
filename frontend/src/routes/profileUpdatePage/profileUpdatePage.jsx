import { useContext, useEffect } from "react";
import "./profileUpdatePage.scss";
import { AurhContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";

function ProfileUpdatePage() {
  let { currentUser, updateUser } = useContext(AurhContext);
  let navigate = useNavigate();

  let handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    // let username = formData.get("username");
    // let password = formData.get("password");
    // let email = formData.get("email");
    let {username,email,password} = Object.fromEntries(formData.entries())


    try {
      let res = await apiRequest.put(`users/${currentUser.id}`, {
        username,
        email,
        password,
      });
      console.log(res.data);
      updateUser(res.data)
      navigate(`/profile/`)

    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);
  return (
    currentUser && (
      <div className="profileUpdatePage">
        <div className="formContainer">
          <form onSubmit={handleSubmit}>
            <h1>Update Profile</h1>
            <div className="item">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                name="username"
                type="text"
                defaultValue={currentUser?.username || "John Doe"}
              />
            </div>
            <div className="item">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                defaultValue={currentUser?.email || "abc@xyz.com"}
              />
            </div>
            <div className="item">
              <label htmlFor="password">Password</label>
              <input id="password" name="password" type="password" />
            </div>
            <button>Update</button>
          </form>
        </div>
        <div className="sideContainer">
          <img src={currentUser?.avatar} alt="avatar" className="avatar" />
        </div>
      </div>
    )
  );
}

export default ProfileUpdatePage;

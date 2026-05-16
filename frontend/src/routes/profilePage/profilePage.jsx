import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import "./profilePage.scss";
import apiRequest from "../../lib/apiRequest";
import { Link, useNavigate } from "react-router-dom";
import { AurhContext } from "../../context/authContext";
import { useContext, useEffect } from "react";
function ProfilePage() {
  let navigate = useNavigate();
  let { currentUser, updateUser } = useContext(AurhContext);

//protected routes

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  let handleLogout = async () => {
    try {
      let res = await apiRequest.post("/auth/logout", {});
      console.log("successfully logout");
      // localStorage.removeItem("userData");
      updateUser(null)
      navigate("/login");
    } catch (error) {
      console.log(error.response.data.message);
    }
  };
  return (
    currentUser && 
    (
      <div className="profilePage">
        <div className="details">
          <div className="wrapper">
            <div className="title">
              <h1>User Information</h1>
              <Link to="/profile/update">Update Profile</Link >
            </div>
            <div className="info">
              <span>
                Avatar:
                <img
                  src={
                    currentUser
                      ? currentUser.avatar
                      : "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  }
                  alt=""
                />
              </span>
              <span>
                Username:{" "}
                <b>{currentUser ? currentUser.username : "John Doe"}</b>
              </span>
              <span>
                E-mail:{" "}
                <b>{currentUser ? currentUser.email : "johnDoe11@gmail.com"}</b>
              </span>
              <div>
                <button onClick={handleLogout}>Logout</button>
              </div>
            </div>
            <div className="title">
              <h1>My List</h1>
              <button>Create New Post</button>
            </div>
            <List />
            <div className="title">
              <h1>Saved List</h1>
            </div>
            <List />
          </div>
        </div>
        <div className="chatContainer">
          <div className="wrapper">
            <Chat />
          </div>
        </div>
      </div>
    )
  );
}

export default ProfilePage;

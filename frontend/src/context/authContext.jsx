import { createContext, useEffect, useState } from "react";

export let AurhContext = createContext();

export let AuthContextProvider = ({ children }) => {
  let user = (localStorage.getItem("userData")) || null
  let [currentUser, setCurrentUser] = useState(JSON.parse(user));
  console.log(currentUser);

  let updateUser = data => setCurrentUser(data)
 
  useEffect(()=>{
    localStorage.setItem("userData",JSON.stringify(currentUser))
  },[currentUser])
  
  return <AurhContext value={{currentUser,updateUser}}>{children}</AurhContext>;
};

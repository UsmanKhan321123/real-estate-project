import axios from "axios"


let apiRequest  = axios.create({
    baseURL : "http://localhost:5000",
    withCredentials:true,
    
})
export default apiRequest
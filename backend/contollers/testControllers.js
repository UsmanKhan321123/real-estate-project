import jwt from "jsonwebtoken";

export let test = (req, res) => {
  console.log(res.json({ message: "testing" }));
};
export let shouldBeLoggedIn = (req, res) => {
  // const token = req.cookies.Token;
  // if (!token) {
  //   return res.status(401).json("not authenticated");
  // }
  // jwt.verify(token, process.env.JWT_SECRET, async (error, payload) => {
  //   if (error) {
  //     return res.json("Token not Verified");
  //   }
  // }); 
  let userId = req.userId
  console.log(userId);
   return res.status(200).json({ message: "You are authenticated" });

};

export let shouldBeAdmin = (req, res) => {
  let token = req.cookies.Token
  if(!token){
    return res.json({message :"You are not authenticated"})

  } 
jwt.verify(token,process.env.JWT_SECRET,async(error,payload) =>{
  if(error){
    return res.json({message : "Token is not verified"})
  }
  if(payload.isAdmin){
    return res.json({message : "Not Authorized for the admin role"})
  }
  return res.json({message: "You are authenticated"})
})

};
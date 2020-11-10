import axios from "axios";

export const signUpUser = async ({ name, email, password }) => {
  
 const response= await axios
    .post("http://localhost:3002/api/users", {
      name,
      email,
      password,
    });
    
  return response;
};

export const loginUser = async ({ email, password }) => {
  
  const response=await axios.post("http://localhost:3002/api/auth", { email, password });
    
  return response;
};
export const fetchUser = async () => {
  
  const jsonToken = await localStorage.getItem("jsonToken");
 const response= await axios
    .get("http://localhost:3002/api/users/me", {
      headers: {
        "x-auth-token": jsonToken,
      },
    });
   

  return response;
};












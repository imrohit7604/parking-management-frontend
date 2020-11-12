import axios from "axios";

export const signUpUser = async ({ name, email, password, typeOfUser }) => {
  let response;
  await axios
    .post("http://localhost:3002/api/users", {
      name,
      email,
      password,
      typeOfUser,
    })
    .then((res) => (response = res))
    .catch((err) => (response = err.response));

  return response;
};

export const loginUser = async ({ email, password }) => {
  let response;
  await axios
    .post("http://localhost:3002/api/auth", { email, password })
    .then((res) => (response = res))
    .catch((err) => (response = err.response));

  return response;
};
export const fetchUser = async () => {
  const jsonToken = await localStorage.getItem("jsonToken");
  let response;
  await axios
    .get("http://localhost:3002/api/users/me", {
      headers: {
        "x-auth-token": jsonToken,
      },
    })
    .then((res) => (response = res))
    .catch((err) => (response = err.response));

  return response;
};

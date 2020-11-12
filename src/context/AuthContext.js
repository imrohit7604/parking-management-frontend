import createDataContext from "./createDataContext";
import { signUpUser, loginUser, fetchUser } from "../api/authApi";

const authReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "get_user":
      return { ...state, user: action.payload };
    case "sign_up":
      return { errorMessage: "" };

    case "sign_in":
      return {
        ...state,
        errorMessage: "",
      };
    case "sign_out":
      return { user: null, errorMessage: "" };
    default:
      return state;
  }
};

const getUser = (dispatch) => {
  return async () => {
    const jsonToken = await localStorage.getItem("jsonToken");

    if (jsonToken == null) return;
    const response = await fetchUser();

    if (response.status === 200)
      dispatch({ type: "get_user", payload: response.data });

    return response;
  };
};

const signUp = (dispatch) => {
  return async (cred) => {
    const response = await signUpUser(cred);
    if (response.status === 200) dispatch({ type: "sign_up" });
    else dispatch({ type: "add_error", payload: response.data.error });
    return response;
  };
};

const signIn = (dispatch) => {
  return async (cred) => {
    const response = await loginUser(cred);
    console.log("authContext: ", response);
    if (response.status === 200) {
      localStorage.setItem("jsonToken", response.data.token);
      //console.log("jsontoken",localStorage.getItem("jsonToken"));
      //await getUser(dispatch);
      dispatch({ type: "sign_in" });
    } else dispatch({ type: "add_error", payload: response.data.error });
    return response;
  };
};

const logOut = (dispatch) => {
  return () => {
    localStorage.removeItem("jsonToken");
    dispatch({ type: "sign_out" });
  };
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signIn, logOut, signUp, getUser },
  {
    user: null,
    errorMessage: "",
  }
);

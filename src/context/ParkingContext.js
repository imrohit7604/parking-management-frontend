
import createDataContext from "./createDataContext";
import {
    fetchZones,fetchSpaces,releaseVehicle,parkVehicle
} from "../api/parkingApi";

const parkingReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
      case "fetch_spaces":
        return { ...state,errorMessage: "", parkingSpaces:action.payload};
    case "fetch_zones":
      return { ...state,errorMessage: "", zones:action.payload};
      case "book_space":
      return { ...state,errorMessage: ""};
      case "vehicle_release":
        return { ...state,errorMessage: ""};
    default:
      return state;
  }
};

const getZones = (dispatch) => {
  return async () => {
    const response = await fetchZones();
    if (response.status===200)
      dispatch({ type: "fetch_zones", payload: response.data});
      else
      dispatch({ type: "add_error", payload: response.data.error });
    return response;
  };
};

const getParkingSpaces = (dispatch) => {
    return async (parkingZoneId) => {
      const response = await fetchSpaces(parkingZoneId);
      if (response.status===200)
        dispatch({ type: "fetch_spaces", payload: response.data});
        else
        dispatch({ type: "add_error", payload: response.data.error });
      return response;
    };
  };

  const releaseSpaceAndVehicle = (dispatch) => {
    return async (vehicle_Id) => {
      const response = await releaseVehicle(vehicle_Id);
      
      if (response.status===200)
        dispatch({ type: "vehicle_release"});
        else
        dispatch({ type: "add_error", payload: response.data.error });
      return response;
    };
  };
  const bookSpace = (dispatch) => {
    return async (parkingZoneId,parkingSpaceId,registrationNumber) => {
      const response = await parkVehicle(parkingZoneId,parkingSpaceId,registrationNumber);
      console.log("parking context book",response);
      if (response.status===200)
        dispatch({ type: "book_space"});
        else
        dispatch({ type: "add_error", payload: response.data.error });
      return response;
    };
  };

export const { Provider, Context } = createDataContext(
    parkingReducer,
  { getZones,getParkingSpaces ,releaseSpaceAndVehicle,bookSpace},
  {
   zones:[],
   parkingSpaces:[]
  }
);

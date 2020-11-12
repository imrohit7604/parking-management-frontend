import axios from "axios";


export const fetchZones = async () => {
  
  const jsonToken = await localStorage.getItem("jsonToken");
  let response;
  await axios
    .get("http://localhost:3002/api/parkingZone", {
      headers: {
        "x-auth-token": jsonToken,
      },
    }).then(res=>response=res).catch(err=>response=err.response);;
  return response;
};
export const fetchSpaces = async (parkingZoneId) => {
  
    const jsonToken = await localStorage.getItem("jsonToken");
    let response;
    await axios
      .get("http://localhost:3002/api/parkingSpace", {
        headers: {
          "x-auth-token": jsonToken,
         "parkingZoneId":parkingZoneId
        },
      }).then(res=>response=res).catch(err=>response=err.response);;
    return response;
  };

  export const releaseVehicle = async (vehicle_Id) => {
  
    const jsonToken = await localStorage.getItem("jsonToken");
    let response;
    await axios
      .put("http://localhost:3002/api/vehicleParking", {vehicle_Id},{
        headers: {
          "x-auth-token": jsonToken,
        },
      }).then(res=>response=res).catch(err=>response=err.response);;
    return response;
  };

  export const parkVehicle = async (parkingZoneId,parkingSpaceId,registrationNumber) => {
  
    const jsonToken = await localStorage.getItem("jsonToken");
    let response;
    await axios
      .post("http://localhost:3002/api/vehicleParking", {parkingZoneId,parkingSpaceId,registrationNumber},{
        headers: {
          "x-auth-token": jsonToken,
        },
      }).then(res=>response=res).catch(err=>response=err.response);;
    return response;
  };

  export const getParkingDetails = async (date) => {
  
    const jsonToken = await localStorage.getItem("jsonToken");
    let response;
    await axios
      .post("http://localhost:3002/api/vehicleParking/parkingDetails",{
        date:{
          day:date.getDate(),
        month:date.getMonth(),
        year:date.getFullYear()
        }
        
      },{
        headers: {
          "x-auth-token": jsonToken,
        },
      }).then(res=>response=res).catch(err=>response=err.response);;
    return response;
  };

  export const reset = async () => {
    const jsonToken = await localStorage.getItem("jsonToken");
    let response;
    await axios
      .get("http://localhost:3002/api/vehicleParking/reset",{
        headers: {
          "x-auth-token": jsonToken,
        },
      }).then(res=>response=res).catch(err=>response=err.response);;
    return response;
  };




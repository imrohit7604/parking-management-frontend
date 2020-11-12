import React, { useContext, useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import ParkingCard from "../ui/ParkingCard";
import { Context as ParkingContext } from "../../context/ParkingContext";
import { sortByAsec } from "../../util/Util";

const Content = () => {
  const { state: parkingState } = useContext(ParkingContext);
  const [spaces, setSpaces] = useState([]);

  useEffect(() => {
    setSpaces(sortByAsec(parkingState.parkingSpaces));
  }, [parkingState]);

  return (
    <Grid container spacing={2}>
      {spaces.map((space) => (
        <Grid key={space.parkingSpaceId} item xs={12} sm={3}>
          <ParkingCard values={space} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Content;

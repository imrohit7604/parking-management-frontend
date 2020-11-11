import { Grid, makeStyles, Typography } from '@material-ui/core'
import React ,{useContext,useEffect,useState}from 'react'
import Content from "../ui/Content";
import { Redirect} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {
  Context as AuthContext,
} from "../../context/AuthContext";
import {
  Context as ParkingContext,
} from "../../context/ParkingContext";
const useStyles = makeStyles((theme) => ({
  
  sortButton:{
marginLeft:"auto"
}
}));
const DashBoard = () => {
  const { state:authState } = useContext(AuthContext);
  const { state:parkingState,getZones,getParkingSpaces } = useContext(ParkingContext);
  const classes = useStyles();
  
  const [anchorEl, setAnchorEl] =useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (zone) => {
    console.log("zone: ",zone);
    getParkingSpaces(zone._id);
    setAnchorEl(null);
  };
  useEffect(()=>{ getZones();
    getParkingSpaces("");
  },[])
  if (!authState.user) 
     return <Redirect to={"/signin"} />
    else
    {
    return (
        <Grid container direction="column" >
        <Grid item container m={4}>
        <Grid item xs={false} sm={1} />
        <Grid item xs={12} sm={10}>
        <Grid container>
        <Typography variant="h4" gutterBottom>
        {authState.user&&authState.user.typeOfUser?"Booking Counter Agent":"Parking Zone Assistant"} / DashBoard
      </Typography>
        <Button className={classes.sortButton} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        Sort By Zone
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={()=>handleClose({_id:""})}>All Zone </MenuItem>
        {
          parkingState.zones.map(zone=>(<MenuItem key={zone._id}onClick={()=>handleClose(zone)}>Zone {zone.parkingZoneTitle}</MenuItem>))
        }
       
      </Menu>
      </Grid>
          <Content/>
          
        </Grid>
        <Grid item xs={false} sm={1} />
      </Grid>
      </Grid>
    )
}
}

export default DashBoard

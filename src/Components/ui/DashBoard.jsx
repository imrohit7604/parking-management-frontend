import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'
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

import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),     
  },
  root: {
    width: '50%',
  },
  reportHeader:{
    marginTop:"50px",
    marginBottom:"20px",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    
    fontWeight: "bold",
  },
  sortButton:{
marginLeft:"auto"
},
resetButton:{
  marginLeft:"auto",
  color:"red",
  fontWeight: "bold",
}
}));
function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}
const DashBoard = () => {
  const { state:authState } = useContext(AuthContext);
  const { state:parkingState,getZones,getParkingSpaces,getParkingZoneReport ,resetDetails} = useContext(ParkingContext);
  const classes = useStyles();
  const [zoneSelect,setZone]=useState({_id:""});
  const [anchorEl, setAnchorEl] =useState(null);
  
  const [dailogOpen, setDailogOpen] = useState(false);
  
  const handleReset=async()=>{
    await resetDetails();
    await getParkingSpaces("")
    setDailogOpen(false);
  }
  

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async(zone) => {
    
    if(zone._id!=null)
    {
      await setZone(()=>zone);
       getParkingSpaces(zone._id);}
    setAnchorEl(null);
  };
  useEffect(()=>{ 
    const interval = setInterval(() => {      
      getParkingSpaces(zoneSelect._id);
      getParkingZoneReport();}, 10000);
    getZones();
    getParkingZoneReport();
    getParkingSpaces("");
    return () => {
      clearInterval(interval);
    };
    
  },[])
  if (!authState.user) 
     return <Redirect to={"/signin"} />
    else
    {
    return (<>
        <Grid container  spacing={2} m>
        
        <Grid item xs={false} sm={1} />
        <Grid item xs={12} sm={7}>
        <Grid container>
        <Typography variant="h4" gutterBottom>
        {authState.user&&authState.user.typeOfUser?"Booking Counter Agent":"Parking Zone Assistant"} / DashBoard
      </Typography>
      
 
        <Button  className={classes.sortButton} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
       Sort By 
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
          parkingState.zones.map(zone=>(<MenuItem key={zone._id} onClick={()=>handleClose(zone)}>Zone {zone.parkingZoneTitle}</MenuItem>))
        }
       
      </Menu>
      </Grid>
          <Content/>
        </Grid>
        <Grid item xs={12} sm={4}>
        <Grid container>
          <Typography className={classes.reportHeader} variant="h3">Parking Zone Report</Typography>
        {parkingState.report.map((zone)=>(<> 
        <Accordion key={zone.title}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading}>Zone {zone.title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Parking Space</TableCell>
            <TableCell align="right">No of Booking</TableCell>
            <TableCell align="right">No of Vehicle Parked(0/1)</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
         
         {zone.value.map((row)=>(<>
          <TableRow key={row.title}>
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="right">{row.value.noOfBookings?row.value.noOfBookings:"0"}</TableCell>
         <TableCell align="right">{row.value.vehicleParked}</TableCell>
              
            </TableRow></>))}
        </TableBody>
      </Table>
    </TableContainer>
        </AccordionDetails>
      </Accordion></>))}
       
        </Grid>
        </Grid>
        <Grid item xs={false} sm={1} />
      
      </Grid>
    
     
      <Dialog
        open={dailogOpen}
        onClose={()=>setDailogOpen(false)}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Reset
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
           Reset Instructions  Reset Instructions  Reset Instructions  Reset Instructions
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={()=>setDailogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleReset} color="primary">
            Reset
          </Button>
        </DialogActions>
      </Dialog>
      </>
    )
}
}

export default DashBoard

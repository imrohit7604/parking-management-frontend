import React,{useState,useContext} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { CardHeader } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import {
  Context as AuthContext,
} from "../../context/AuthContext";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  headVacant: {
    height: 140,    
    background:"green"
  },
  headOccupied: {
    height: 140,    
    background:"gray"
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,    
    padding: theme.spacing(2, 4, 3),
    borderRadius:5,

    
  },
}));

const ParkingCard = (props) => {
  const { state } = useContext(AuthContext);
    const classes = useStyles();
    const {parkingSpaceTitle,registrationNumber
      }=props.values;
    const [localState,setState]=useState({registrationNumber:"",registrationNumberError:""});
  const [open, setOpen] = useState(false);

  const handelChange = (event) => {
    setState({
      ...localState,
      [event.target.id]: event.target.value,
      registrationNumberError: null,
    });
  };
  const handleSubmit = async(event) => {
    event.preventDefault();
    vaildate();
    console.log("local state",localState);

    //const isVaild = vaildate();
   //const respone=await loginUser({email:localState.email,password:localState.password});
    //console.log("response: ",respone);
  };
  const vaildate = () => {
  let isVaild=true;
    if (localState.registrationNumber.length <= 0) {
      setState({
        ...localState,
        registrationNumberError: "Enter Registration Number",       
      });
      isVaild= false;
  };
  return isVaild;
};
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
    return (
      <>
        <Card className={classes.root}>
       
          <CardHeader
            className={registrationNumber?classes.headOccupied:classes.headVacant}
            title={<Typography variant="h3" component="h2" >
            {parkingSpaceTitle.title}
          </Typography>}
        >
         
          </CardHeader>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {registrationNumber?"Occupied":"Vacant"}
            </Typography>
           <Typography variant="body2" color="textSecondary" component="p">
              {registrationNumber?registrationNumber:"Vehicle Registation Number"}
            </Typography>
            <CardActions style={{justifyContent: 'center'}}>
            <Button variant="contained"  color="primary" disabled={state.user&&!state.user.typeOfUser} onClick={handleOpen} >           
            {registrationNumber?"Release":"Book"}    </Button>
          </CardActions>
          </CardContent>
     
       
      </Card>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h1 id="transition-modal-title">Enter Registation Number</h1>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Registation Number"              
              autoFocus
              error={localState.registrationNumberError}
              id="registrationNumber"
              onChange={handelChange}
            />
             <Button variant="contained"  color="primary" onClick={handleSubmit} fullWidth  >           
            {registrationNumber?"Release":"Book"}    </Button>
          </div>
        </Fade>
      </Modal>
      </>
    )
}

export default ParkingCard

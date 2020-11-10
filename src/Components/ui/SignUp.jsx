import React ,{useState}from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {signUpUser} from "../../api/authApi";
import { FormControl, InputLabel, MenuItem, Select } from '@material-ui/core';
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/imrohit7604/">
        Rohit
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [localState, setState] = useState({
    name:"",
    email: "",
    password: "",
    nameError:"",
    emailError: "",
    passwordError: "",
    typeOfUser:null,
    typeOfUserError:null
  });
  const [open, setOpen] = React.useState(false);
  const handleChange = (event) => {
    setState({
      ...localState,
      [event.target.id]: event.target.value,
      emailError: null,
      passwordError: null,
      typeOfUserError:null,
    });
  };
  const handelSubmit = async(event) => {
    event.preventDefault();
    const isVaild = vaildate();
  // const respone=await signUpUser({email:localState.email,password:localState.password});
    //console.log("response: ",respone);
    console.log("local state ",localState);
    console.log("isVaild",isVaild);
  };
  
  const vaildate = () => {
      
    let isVaild = true;
      const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

      if (
        localState.name.length <= 0 
      ) {
        isVaild = false;
        setState((newValue) => ({
          ...newValue,
          nameError: "Enter Valid Name",
        }));
      } else {
        setState((newValue) => ({ ...newValue, nameError: "" }));
      }
      
      if (!localState.email.includes("@")) {
        isVaild = false;
        setState((newValue) => ({
          ...newValue,
          emailError: "Enter vaild email address",
        }));
      } else {
        setState((newValue) => ({
          ...newValue,
          emailError: "",
        }));
      }
      if (!localState.password.match(passw)) {
        isVaild = false;
        setState((newValue) => ({
          ...newValue,
          passwordError:
            "Password between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter",
        }));
      } else {
        setState((newValue) => ({
          ...newValue,
          passwordError: "",
        }));
      }     
      
      if (localState.typeOfUser == null||localState.typeOfUser.length<=0) {
        isVaild = false;
        setState((newValue) => ({
          ...newValue,
          typeOfUserError: "Select type of user you are!!",
        }));
      } else {
        setState((newValue) => ({
          ...newValue,          
          typeOfUserError: "",
        }));
      }
      return isVaild;
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
          <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              error={localState.nameError}
              value={localState.name}
              onChange={handleChange}
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              error={localState.emailError}
              value={localState.email}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              error={localState.passwordError}
              value={localState.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
            <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor="typeOfUser">Type Of User</InputLabel>
        <Select
          native
          value={localState.typeOfUser}
          onChange={handleChange}
          label="Type Of User"
          error={localState.typeOfUserError}
          autoWidth
          inputProps={{
            name: 'typeOfUser',
            id: 'typeOfUser',
          }}
        >
          <option aria-label="None" value="" />
          <option value={true}>Booking Counter Agent</option>
          <option value={false}>Parking Zone Assistant</option>
          
        </Select>
      </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handelSubmit}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item xs>
              
              </Grid>
              <Grid item>
                <Link to="/signin">
                  {"Sign In "}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
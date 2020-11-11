import React ,{useState,useContext}from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

import { Link,Redirect } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { FormControl, InputLabel,  Select } from '@material-ui/core';
import {
  Context as AuthContext,
} from "../../context/AuthContext";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      
        Rohit
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  error:{
    color:"red",
  },
  success:{
    color:"green",
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
  const { state, signUp } = useContext(AuthContext);
  const classes = useStyles();
  const [localState, setState] = useState({
    name:"",
    email: "",
    password: "",
    nameError:false,
    typeOfUser:"",
    emailError: false,
    passwordError: false,    
    typeOfUserError:false,
    signUpSuccess:"",
    signUpError:"",
  });
  
  const handleChange = (event) => {
    setState({
      ...localState,
      [event.target.id]: event.target.value,
      nameError:false,
      emailError: false,
      passwordError: false,
      typeOfUserError:false,
    });
  };
  const handelSubmit = async(event) => {
    event.preventDefault();
    const isVaild = vaildate();
    if(isVaild)
    {
      const response=await signUp({name:localState.name,email:localState.email,password:localState.password,typeOfUser:localState.typeOfUser==="true"?true:false});
      if (response.status===200)
      setState({...localState,signUpError:"",signUpSuccess:"Registred Successfully :)"});
      else
      setState({...localState,signUpSuccess:"",signUpError:"Already Registred"});
      console.log("response: ",response);
      console.log("local state ",localState);
    }
   
    
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
          nameError:true
        }));
      } else {
        setState((newValue) => ({ ...newValue, nameError: false }));
      }
      
      if (!localState.email.includes("@")) {
        isVaild = false;
        setState((newValue) => ({
          ...newValue,
          emailError: true,
        }));
      } else {
        setState((newValue) => ({
          ...newValue,
          emailError: false,
        }));
      }
      if (!localState.password.match(passw)) {
        isVaild = false;
        setState((newValue) => ({
          ...newValue,
          passwordError:true
        }));
      } else {
        setState((newValue) => ({
          ...newValue,
          passwordError: false,
        }));
      }     
      
      if (localState.typeOfUser == null||localState.typeOfUser.length<=0) {
        isVaild = false;
        setState((newValue) => ({
          ...newValue,
          typeOfUserError: true,
        }));
      } else {
        setState((newValue) => ({
          ...newValue,          
          typeOfUserError: false
        }));
      }
      return isVaild;
  };
  if (state.user) 
  return <Redirect to={"/dashboard"} />
 else
 {
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
              <Typography className={classes.error} variant="overline" display="block" gutterBottom>
            {localState.nameError&&"Enter vaild name!"}
          </Typography>
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
             <Typography className={classes.error} variant="overline" display="block" gutterBottom>
            {localState.emailError&&"Enter vaild email!"}
          </Typography>
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
             <Typography className={classes.error} variant="overline" display="block" gutterBottom>
          {localState.passwordError&&"Password between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter"}
          </Typography>
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
      <Typography className={classes.error} variant="overline" display="block" gutterBottom>
            {localState.typeOfUserError&&"Select type of user you are!"}
          </Typography>
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
            <Typography className={classes.success} variant="overline" display="block" gutterBottom>
            {localState.signUpSuccess&&localState.signUpSuccess}
          </Typography>
            <Typography className={classes.error} variant="overline" display="block" gutterBottom>
            {localState.signUpError&&localState.signUpError}
          </Typography>
           
         
         
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
}
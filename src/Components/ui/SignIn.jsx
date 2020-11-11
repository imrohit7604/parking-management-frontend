import React ,{useState,useContext,useEffect}from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

import { Link ,Redirect} from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
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

export default function SignIn(props) {
  const { state, signIn,getUser } = useContext(AuthContext);
  const classes = useStyles();
  const [localState, setState] = useState({
    email: "",
    password: "",
    emailError: false,
    passwordError: false,
    signInError:"",
    signInSuccess:""
  });
  const handelChange = (event) => {
    setState({
      ...localState,
      [event.target.id]: event.target.value,
      emailError: false,
      passwordError: false,
    });
  };
  const handelSubmit = async(event) => {
    event.preventDefault();
    const isVaild = vaildate();
    if(isVaild)
   {const respone=await signIn({email:localState.email,password:localState.password});
   if(respone.status===200) 
    {
      setState({...localState,signInError:"",signInSuccess:"Login Successfully :)"});
      await getUser();
    } 
   else
   setState({...localState,signInSuccess:"",signInError:"InVaild Email and Password :("});
   }
  };
  const vaildate = () => {
      
    if (localState.email.includes("@") && localState.password.length > 0) {
      return true;
    }

    if (!localState.email.includes("@") && !localState.password.length > 0) {
      setState({
        ...localState,
        passwordError: true,
        emailError: true,
      });
    } else if (!localState.email.includes("@")) {
      setState({ ...localState, emailError: true });
    } else if (!localState.password.length > 0) {
      setState({ ...localState, passwordError: true });
    }
    return false;
  };
  useEffect(()=>{},[state])
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
          <Typography component="h3" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={localState.emailError}
              value={localState.email}
              onChange={handelChange}
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
              autoComplete="current-password"
              error={localState.passwordError}
              value={localState.password}
              onChange={handelChange}
            />
               <Typography className={classes.error} variant="overline" display="block" gutterBottom>
            {localState.passwordError&&"Enter password!"}
          </Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handelSubmit}
            >
              Sign In
            </Button>
            <Typography className={classes.success} variant="overline" display="block" gutterBottom>
            {localState.signUpSuccess&&localState.signUpSuccess}
          </Typography>
            <Typography className={classes.error} variant="overline" display="block" gutterBottom>
            {localState.signInError&&localState.signInError}
          </Typography>
      
          
            <Grid container>
              
              <Grid item>
                  <Typography  label="Sign Up"
                    component={Link} to="/signup">
                  
                  {"Don't have an account? Sign Up"}
              
                  </Typography>
                
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
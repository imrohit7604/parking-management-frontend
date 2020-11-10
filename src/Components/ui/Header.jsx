import React,{useEffect, useState,useContext} from 'react'
import { AppBar, Tabs, Toolbar,Tab, Button,Typography, useTheme, Avatar} from '@material-ui/core'
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import {
    Context as AuthContext,
  } from "../../context/AuthContext";

function ElevationScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
      target: window ? window() : undefined,
    });
  
    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
  }
  
  const useStyles=makeStyles(theme=>({
      toolbarMargin:{
          ...theme.mixins.toolbar,
         
      },
      logo:{
          fontSize:"3em",
          color:"white",
          fontWeight:700,
          
      },
      logoConatiner:{
        padding:0,
        "&:hover":{
            backgroundColor:"transparent"
        }
      },
      tabContainer:{
          marginLeft:"auto"
      },
      tab:{
        fontWeight:700,
        fontSize:"1.5rem",
        textTransform:"none",
        minWidth:10,
        marginLeft:"25px",
        marginRight:"25px"
        
      },
      avatarIcon:{
        marginLeft:"25px",
        marginRight:"25px"
        
      },
      button:{
        ...theme.typography.estimate,
        borderRadius:"50px",
        marginLeft:"50px",
        marginRight:"25px",
       
      },
      menu:{
          backgroundColor:theme.palette.common.blue,
          color:"white",
          borderRadius:"0px"
      },
      menuItem:{
          ...theme.typography.tab,
          opacity:0.7,
          "&:hover":{
              opacity:1
          }
      }
  }))

const Header = (props) => {
    const { state ,logOut} = useContext(AuthContext);
    const classes=useStyles();
    const [value,setValue]=useState(0);
   const theme=useTheme();

    const handleChange=(e,value)=>{
        setValue(value);
    } 
    const SingInTabs=<>
    <Tabs 
                value={value}
                onChange={handleChange}
                className={classes.tabContainer}
                indicatorColor="secondary"
                >
                    <Tab 
                    className={classes.tab} 
                    label="Home"
                    component={Link}
                    to="/"
                    />
                    <Tab 
                    className={classes.tab} 
                    label="DashBoard"
                    component={Link}
                    to="/dashboard"
                    />
                    
                       
                       
                </Tabs>
                <Button variant="contained"  color="secondary" onClick={logOut} >Logout</Button>
<Avatar className={classes.avatarIcon}>{state.user&&state.user.name[0].toUpperCase()}</Avatar></> 
                const SingOutTabs=<>
                <Tabs 
                            value={value}
                            onChange={handleChange}
                            className={classes.tabContainer}
                            indicatorColor="secondary"
                            >
                                <Tab 
                                className={classes.tab} 
                                label="Home"
                                component={Link}
                                to="/"
                                />
                               
                                 <Tab 
                                className={classes.tab} 
                                label="Sign In"
                                component={Link}
                                to="/signin"
                                />
                                <Tab 
                                className={classes.tab} 
                                label="Sign Up"
                                component={Link}
                                to="/signup"
                                />
                              
                            </Tabs></> 
    useEffect(()=>{
        console.log("header state:",state);
       // console.log("pathname ",window.location.pathname);
       if(state.user)
       {
        
        switch(window.location.pathname)
        {            case "/": 
                    if(value!==0){
                        setValue(0);
                    }
                    break;
            
            
                        case "/dashboard": 
                        if(value!==1){
                            setValue(1);
                        }
                        break;
            
        }
       }
       else
       {
        switch(window.location.pathname)
        {            case "/": 
                    if(value!==0){
                        setValue(0);
                    }
                    break;
            
            case "/signin": 
                        if(value!==1){
                            setValue(1);
                        }
                        break;
            case "/signup": 
                        if(value!==2){
                            setValue(2);
                        }
                        break;
                       
            
        } 
       }
    },[value,state]);
    return (
        <>
        <ElevationScroll>
        <AppBar position="fixed"  > 
            <Toolbar disableGutters>
                <Button disableRipple component={Link} to="/" className={classes.logoConatiner} onClick={()=>setValue(0)}>
                <Typography  className={classes.logo}>
                    Parking Management
                </Typography>
                </Button>             
                {state.user?SingInTabs:SingOutTabs}
            </Toolbar>
        </AppBar>
        </ElevationScroll>
        <div className={classes.toolbarMargin}/>
        </>
    )
}

export default Header

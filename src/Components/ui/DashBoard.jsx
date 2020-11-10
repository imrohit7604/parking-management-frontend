import { Grid } from '@material-ui/core'
import React ,{useContext}from 'react'
import Content from "../ui/Content";
import { Redirect} from 'react-router-dom';
import {
  Context as AuthContext,
} from "../../context/AuthContext";
const DashBoard = () => {
  const { state } = useContext(AuthContext);
  if (!state.user) 
     return <Redirect to={"/signin"} />
    else
    {
    return (
        <Grid container direction="column">
        <Grid item container>
        <Grid item xs={false} sm={2} />
        <Grid item xs={12} sm={8}>
          <Content/>
          
        </Grid>
        <Grid item xs={false} sm={2} />
      </Grid>
      </Grid>
    )
}
}

export default DashBoard

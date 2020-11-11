import { Grid } from '@material-ui/core'
import React from 'react'
import ParkingCard from "../ui/ParkingCard";
const Content = () => {
    const ob1={
        parkingSpaceTitle:{
                title:"A01"
        },
        registrationNumber:"DL56 AB 09"
    }
    const ob2={
        parkingSpaceTitle:{
                title:"A01"
        },
        
    }
    return (
        <Grid container spacing={2}>
     <Grid item xs={12} sm={3}>
        <ParkingCard values={ob1}/>
       
      </Grid>
      <Grid item xs={12} sm={3}>
        <ParkingCard values={ob2}/>
       
      </Grid>
      <Grid item xs={12} sm={3}>
        <ParkingCard values={ob1}/>
       
      </Grid>
      <Grid item xs={12} sm={3}>
        <ParkingCard values={ob2}/>
       
      </Grid>
      <Grid item xs={12} sm={3}>
        <ParkingCard values={ob1}/>
       
      </Grid>
      <Grid item xs={12} sm={3}>
        <ParkingCard values={ob2}/>
       
      </Grid>
      <Grid item xs={12} sm={3}>
        <ParkingCard values={ob1}/>
       
      </Grid>
      <Grid item xs={12} sm={3}>
        <ParkingCard values={ob2}/>
       
      </Grid>
      </Grid>
    )
}

export default Content

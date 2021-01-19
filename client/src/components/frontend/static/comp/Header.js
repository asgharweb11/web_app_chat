
import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Typography,
} from "@material-ui/core";



const useStyles = makeStyles((theme) => ({
  h1Header : {
    fontSize : "25px",
    color : "#716e6e",
  }
}));

 const Header = () => {
    const classes = useStyles();
    return (
        <Grid container className="headerChat">
            <Grid item>
              <Typography variant="h1" className={classes.h1Header} gutterBottom>Messages</Typography>
            </Grid>
        </Grid>
    )
}

export default Header;
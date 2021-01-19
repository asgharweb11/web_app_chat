import React from 'react';
import {useSelector} from "react-redux"
import {
  Button,
  Grid,
  InputBase,
  IconButton,
  Typography,
} from "@material-ui/core";

import SearchIcon from '@material-ui/icons/Search';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

import profiel from "../../../../img/profile.jpg";



const SubHeader = () => {
  //const Rooms = 
    return (
        <Grid container className="MenuNavChat" alignItems="center">
          <Grid item lg={3} md={4} xs={5} className="MenuNavChatSearch">
              <InputBase
                  placeholder="Search Google Maps"
                  inputProps={{ 'aria-label': 'search google maps' }}
                />
              <IconButton type="submit">
                <SearchIcon />
              </IconButton>
          </Grid>
          <Grid item lg={9} md={8} xs={7} className="MenuNavChatData">
              <Grid container>
                <Grid item className="ChatDataBack" style={{textAlign : "right"}} xs={6}>
                  <div className="divback">
                      <Button><ArrowForwardIcon /> back to down</Button>
                  </div>
                </Grid>
                <Grid item className="ChatDataProUser" xs={6}>
                  <div className="DataProf">
                    <div className="imgProf">
                      <img src={profiel} alt="profile" />
                    </div>
                    <div className="TitleProf">
                      <Typography variant="subtitle1" gutterBottom>Asghar Ali</Typography>
                    </div>
                      
                  </div>
                </Grid>
              </Grid>
          </Grid>
        </Grid>
    )
}

export default SubHeader;
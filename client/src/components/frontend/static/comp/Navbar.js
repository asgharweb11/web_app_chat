
import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import {useDispatch} from "react-redux";
import {
  List,
  ListItem,
  ListItemIcon,
  Link,
} from "@material-ui/core";
import {Logout} from "../../../../actions/auth"

import MenuIcon from '@material-ui/icons/Menu';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';
import AssessmentIcon from '@material-ui/icons/Assessment';
import BurstModeIcon from '@material-ui/icons/BurstMode';
import CameraIcon from '@material-ui/icons/Camera';
import CommentIcon from '@material-ui/icons/Comment';
import SettingsIcon from '@material-ui/icons/Settings';



const ArrayIcons = [
  {icon : MenuIcon , link : "/"}, 
  {icon : AccountBoxIcon , link : "/contacts"}, 
  {icon : AlarmOnIcon , link : "/"}, 
  {icon : AssessmentIcon , link : "/"}, 
  {icon : BurstModeIcon , link : "/"},
  {icon : CameraIcon , link : "/register"}, 
  {icon : CommentIcon , link : "/login"}
];

const useStyles = makeStyles((theme) => ({
  listNav : {
    padding: 0,
    height: "100%"
  },
  listItemNav : {
    padding: "20px",
  },
}));

const Navbar = () => {
    const classes = useStyles();
    //const Auth = useSelector(state => state.auth);
    const dispatch = useDispatch();





    return (
        <div className="slideNav">
          <List className={classes.listNav} component="nav" aria-label="main mail folders">
            <div className="containerNav">
              {ArrayIcons.map((Data , key) => {
                const Icon = Data.icon;
                return (
                  <Link href={Data.link} key={key}>
                    <ListItem button component="div" className={classes.listItemNav}>
                        <ListItemIcon style={{color:"#9a9a9a"}} >
                          <Icon />
                        </ListItemIcon>
                    </ListItem>
                  </Link>
                )
              })}
            </div>
            <div className="iconSetting">
              <Link onClick={e => {e.preventDefault();dispatch(Logout())}}>
                <ListItem button component="div" className={classes.listItemNav}>
                  <ListItemIcon style={{color:"#9a9a9a"}} >
                    <SettingsIcon />
                  </ListItemIcon>
                </ListItem>
              </Link>
            </div>
          </List>
        </div>
    )

}

export default Navbar;